const express = require('express'),
  updateKeysRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  keysHelper = require('./keysHelper');

updateKeysRoute.post('/', upload.none(), (req, res) => {
  keysHelper.updateKeys(req, res);
});

exports.updateKeysRoute = updateKeysRoute;
