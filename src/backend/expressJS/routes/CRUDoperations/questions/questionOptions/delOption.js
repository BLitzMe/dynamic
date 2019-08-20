const express = require('express'),
  delOptionsRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  optionsHelper = require('./optionsHelper');

delOptionsRoute.post('/', upload.none(), (req, res) => {
  optionsHelper.delOptionsWrapper(req, res);
});

exports.delOptionsRoute = delOptionsRoute;
