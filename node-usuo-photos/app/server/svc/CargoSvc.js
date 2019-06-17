/**
 * Created by outrun on 2/28/16.
 */
var BizHelper = require('../lib/BizHelper'),
  Admin = require('../model/Admin'),
  Cargo = require('../model/Cargo');

var thenData = BizHelper.svc.thenData,
  thenMsg = BizHelper.svc.thenMsg;

exports.addAdminMultiPhoto = function (data) {
  "use strict";
  var _diy = new Object;
  var admin = this.req.bag.admin;
  return Promise.resolve(data).then(function () {
    _diy.cargoes = data.cargoes;
  }).then(function () {
    _diy.cargoes.forEach(function (cargo) {
      cargo.creatorId = admin._id;
      cargo.creatorNickname = admin.nickname || '';
    });
    return Cargo.create(_diy.cargoes)
  }).then(function (cargoes) {
    var adminCargoes = new Array;
    cargoes.forEach(function (cargo) {
      adminCargoes.push({
        cargoId: cargo.id
      })
    });
    return Admin.update({/*isDeleted: {$ne: true},*/ _id: data.adminId}, {
      $addToSet: {
        cargoes: {
          $each: adminCargoes
        }
      },
    }).exec()
  }).then(function (updObj) {
    return thenMsg('suc');
  })
};

exports.getMulti = function (data) {
  "use strict";
  var self = this;

  return Promise.resolve(data).then(function () {
    var finder = {isDeleted: {$ne: true}};

    var type = data['type'], genre = data['genre'];
    data['creatorId'] && (finder['creatorId'] = data['creatorId']);
    type && (finder['type'] = type);
    data['createdAt'] && (finder['createdAt'] = {$gt: data['createdAt']});
    data['adminIds'] && (finder['creatorId'] = {
      $in: JSON.parse(data['adminIds'])
    });

    // type
    if (type == 1) {
      genre && (finder['photo.genre'] = genre);
    }

    // content
    var content = data['content'];
    if (content) {
      var reg = new RegExp(content);
      finder['title'] = reg;
      finder['desc'] = reg;

      if (type == 1) {
        finder['photo.title'] = reg;
        finder['photo.desc'] = reg;
      }
    }

    // time
    var timeBegin = data['timeBegin'], timeEnd = data['timeEnd'];
    if (timeBegin || timeEnd) {
      var finderCreatedAt = finder['createdAt'] = {};
      if (timeBegin) {
        finderCreatedAt.$gt = new Date(timeBegin).getTime();
      }
      if (timeEnd) {
        finderCreatedAt.$lt = new Date(timeEnd).getTime();
      }
    }

    return self.page(Cargo, finder, null, {createdAt: -1});
  }).then(function (retData) {
    retData = JSON.parse(JSON.stringify(retData));
    var cargoes = retData.pages;
    if (cargoes instanceof Array) {
      cargoes.forEach(function (cargo) {
        cargo.createdAtStr = new Date(cargo.createdAt).toLocaleString()
        var genreStr;
        switch (cargo.genre) {
          case 1:
            genreStr = '证件照';
            break;
          case 2:
            genreStr = '文艺照';
            break;
          case 3:
            genreStr = '形象照';
            break;
          case 4:
            genreStr = '头像照';
            break;
          case 5:
            genreStr = '登记照';
            break;
          case 6:
            genreStr = '萌宠照';
            break;
          case 7:
            genreStr = '全家福';
            break;
        }
        cargo.genreStr = genreStr;
      })
    }

    return thenData(retData);
  })
};

exports.delMulti = function (data) {
  "use strict";
  var _diy = new Object;
  return Promise.resolve(data).then(function () {
    _diy.cargoIds = data['cargoIds'];
  }).then(function () {
    Cargo.remove({_id: {$in: _diy.cargoIds}}).exec()
  }).then(function (rmObj) {
    return thenMsg('suc');
  });
};

exports.upd = function (data) {
  "use strict";
  var _diy = new Object;
  return Promise.resolve().then(function () {
    _diy.photoId = data['photoId'];
  }).then(function () {
    var finder = {
      isDeleted: {$ne: true},
      _id: data._id
    };
    var updater = {};
    if (_diy.photoId) {
      finder['photos._id'] = _diy.photoId;
      data['photoUrlRevised'] && (updater['photos.$.urlRevised'] = data['photoUrlRevised']);
    }

    return Cargo.update(finder, updater).exec();
  }).then(function (updObj) {
    return thenMsg('suc');
  });
};
