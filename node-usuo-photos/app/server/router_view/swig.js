/**
 * Created by outrun on 2/27/16.
 */
var router = require('express').Router();
var SwigPrep = require('../prep/SwigPrep');

router.get('/', SwigPrep.blank);

module.exports = router;
