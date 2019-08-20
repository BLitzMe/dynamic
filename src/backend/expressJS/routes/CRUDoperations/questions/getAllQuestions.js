const express = require('express'),
  getAllQuestionsRoute = express.Router(),
  quesDocModel = require('../../../models/questionsDocModel');

getAllQuestionsRoute.get('/', (req, res) => {
  getAllQues(req, res);
});

async function getAllQues(req, res) {
  let allDocs = await quesDocModel.questionsDocModel.find({});
  res.status(200).json(allDocs);
}
exports.getAllQuestionsRoute=getAllQuestionsRoute;