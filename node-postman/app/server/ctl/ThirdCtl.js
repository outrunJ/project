/**
 * Created by outrun on 5/2/16.
 */

var ThirdSvc = require('../svc/ThirdSvc'),
  ResHandler = require('../lib/ResHandler');

exports.rssCNN = function (req, res) {

  console.log(JSON.stringify(req.query, null, 4));
  res.json(req.query);
};