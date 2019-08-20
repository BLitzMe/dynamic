const express = require('express'),
  updateOptionsRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  optionsHelper = require('./optionsHelper');

updateOptionsRoute.post('/insertNewOptions', upload.none(), (req, res) => {
  console.log(req.body);
  optionsHelper.insertNewOptionsWrapper(req, res);
});
updateOptionsRoute.post('/updateAnOption', upload.none(), (req, res) => {
  optionsHelper.updateAnOption(req, res);
});
exports.updateQuestionOptions = updateOptionsRoute;
