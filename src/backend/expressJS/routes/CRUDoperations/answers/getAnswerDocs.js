const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  ansHelper = require('./answersDocHelper'),
  getAnswersDocsRoute = express.Router();

getAnswersDocsRoute.get('/allAnswerDocs', upload.none(), (req, res) => {
  //return answer docs with earliest first
  ansHelper.getAllAnsDocsLatestFirst(res);
});

exports.getAllAnswersDocsRoute = getAnswersDocsRoute;
