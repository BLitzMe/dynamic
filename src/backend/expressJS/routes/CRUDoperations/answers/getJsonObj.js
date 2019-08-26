const express = require('express'),
  ansHelper = require('./answersDocHelper'),
  multer = require('multer'),
  upload = multer(),
  getJsonRoute = express.Router();

getJsonRoute.post('/', upload.none(), (req, res) => {
  ansHelper.generateJSON(req, res);
});
exports.getJsonRoute = getJsonRoute;
