/**
 * Created by outrun on 11/2/15.
 */
"use strict";
var _ = require('underscore');

var navigator = require('../data/navigator'),
  rolePms = require('../data/rolePms');

var ResHandler = require('./ResHandler'),
  ErrHandler = require('./ErrHandler'),
  diyUtil = require('./diyUtil');

var ctl = {
  paramsJoin: function (req) {
    return (_.extend/*Own*/(req.body, req.query, req.params), req.body);
  },
  thenResponse: function (res, promise) {

    promise.then(function (data) {
      ResHandler.ok(res, data);
    }, function (err) {
      console.log('biz err:', err);
      ResHandler.errServer(res, err);
    });
  },
  response: function (req, res, fields, onSuc, onErr) {
    var _onErr = function (err) {
      throw err || new Error;
    };

    var params = (_.extend/*Own*/(req.body, req.query, req.params), req.body);
    var data = new Object;
    var pass = true;

    if (fields === null || fields === undefined || !(fields instanceof Array)) {
      data = params;
    } else if (fields instanceof Array) {
      if (fields[0] instanceof Array) {
        try {
          fields[0].forEach(function (key) {
            if (params[key] === undefined) throw new Error('not enough params');

            data[key] = params[key];
          })
        } catch (e) {
          if (e.message === 'not enough params') pass = false;
        }
      }

      if (pass && fields[1] instanceof Array) {
        fields[1].forEach(function (key) {
          params[key] && (data[key] = params[key]);
        })
      }
    }

    if (pass) {
      var caller = {req: req, res: res};
      if (data['adminId'] === undefined) data['adminId'] = (req.bag.admin && req.bag.admin.id);

      data['pageSlice'] = svc.genSlice(data, 0, 20);
      var pageSize = data['pageSize'],
        pageNum = data['pageNum'];
      if (pageSize && pageNum) {
        caller.ifPaging = true;
      } else {
        caller.ifPaging = false;
        pageSize = 20, pageNum = 1;
      }
      caller.page = function (model, finder, filter, sorter) {
        var retData;
        return model.find(finder, filter, data['pageSlice']).sort(sorter).then(function (arr) {
          retData = arr;
          return model.count(finder)
        }).then(function (totalCount) {
          var pageCount = Math.ceil(totalCount / pageSize);
          return {
            pageCount: pageCount,
            totalCount: totalCount,
            pages: retData,
          }
        });
      };

      ctl.thenResponse(res, onSuc.call(caller, data));
    } else {
      typeof onErr === 'function' ? onErr() : _onErr()
    }
  }
};

var svc = {
  thenChunk: function (promise) {
    return diyUtil.obj.toPromise(promise).then(function (chunk) {
      return chunk;
    });
  },
  thenData: function (promise) {
    return svc.thenChunk(diyUtil.obj.toPromise(promise).then(function (data) {
      return {
        code: ResHandler.DEFAULT_CODE,
        data: data,
      };
    }));
  },
  thenMsg: function (promise) {
    return svc.thenChunk(diyUtil.obj.toPromise(promise).then(function (msg) {
      return {
        code: ResHandler.DEFAULT_CODE,
        msg: msg,
      };
    }));
  },
  genSlice: function (params, skip, limit, sort) {

    params['pageSize'] > 0 && (limit = params['pageSize']);
    params['pageNum'] > 0 && (skip = params['pageNum'] * limit);

    return {
      sort: sort || {createdAt: -1},
      skip: skip,
      limit: limit
    };
  }
};

var errThrower = {
  blank: function (obj, code) {
    if (diyUtil.obj.isBlank(obj)) {
      throw ErrHandler.getBizErr(code);
    }
  },
  notBlank: function (obj, code) {
    errThrower.blank(!obj, code);
  }
};

var pms = {
  roleNav: function (roles, topNavInd, subNavInd) {
    var pms;
    if (!roles) pms = rolePms.normal;
    else if (roles.indexOf('super') == -1)  pms = rolePms.normal;
    else pms = rolePms.super;

    var nav = diyUtil.obj.deepCopy(navigator);
    nav[topNavInd]['active'] = true;
    nav[topNavInd]['sub'][subNavInd ]['active'] = true;
    pms.forEach(function (topPms, topInd) {
      if (!topPms) {
        delete nav[topInd];
      } else {

        if (topNavInd == topInd) {
          nav['tagTitle'] = nav[topInd]['tagTitle'];
          nav['sub'] = nav[topInd]['sub'];
          // sub
          if (topPms instanceof Array) {
            topPms.forEach(function (subPms, subInd) {
              if (!subPms) {
                nav['sub'].splice(subInd, 1);
              }
            })
          }
          // //sub
        }
      }
    });

    return nav;
  }
};

module.exports = exports = {
  ctl: ctl,
  svc: svc,
  err: errThrower,
  pms: pms,
};
