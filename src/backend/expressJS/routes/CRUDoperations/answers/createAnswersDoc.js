const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  createAnswersDocRoute = express.Router(),
  answersDocModel = require('../../../models/answersModel');

createAnswersDocRoute.post('/', (req, res) => {
  saveAnswersDoc(req, res);
});

async function saveAnswersDoc(req, res) {
  let doc = req.body;
  let localAnswerObj = {
    date: doc.date,
    userInfo: doc.userInfo,
    answerObj: doc.answerObj
  };
  let tempModel = new answersDocModel.answersModel(localAnswerObj);
  let newAnswsersDoc = await tempModel.save();
  res.write(
    JSON.stringify({
      message: 'saved new answers doc',
      answersDoc: newAnswsersDoc
    })
  );
  res.status(200).end();
}
exports.createAnswersDocRoute = createAnswersDocRoute;
