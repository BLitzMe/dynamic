/* //**
 *   1. add key to fields array
 *   2. push new question to questions array on doc identifieed by key
 *
 *
 * */

const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  addQuestionRoute = express.Router(),
  quesModelObj = require('../../../models/questionsDocModel'),
  crudHelper = require('../../CRUDoperations/crudHelper');

addQuestionRoute.post('/', upload.none(), (req, res) => {
  addAQuestion(req, res);
});

async function addAQuestion(req, res) {
  console.log(req.body);
  let schemaDocAfterAdd = await crudHelper.enterNewFieldsToSchema(req);

  res.write(
    JSON.stringify({
      message: 'field added to db schemas doc',
      newDoc: schemaDocAfterAdd
    })
  );

  let quesVal;
  let quesOptions;
  if (req.body.newQuestionKey === undefined) {
    res.status(500).write(JSON.stringify({ message: 'no question key' }));
  } else {
    if (req.body.newQuestionValue === undefined) {
      quesVal = '';
    } else {
      quesVal = req.body.newQuestionValue;
    }
    if (req.body.newQuestionOptions === undefined) {
      quesOptions = [];
    } else {
      quesOptions = req.body.newQuestionOptions;
    }
    let quesObj = new crudHelper.newQuesObj(
      req.body.newQuestionKey,
      quesVal,
      quesOptions
    );
    let updatedQuestionsDoc = await quesModelObj.questionsDocModel.findOneAndUpdate(
      { schemaName: req.body.schemaName },
      {
        $push: { questions: quesObj }
      },
      {
        new: true
      }
    );
    res.status(200).write(
      JSON.stringify({
        message: 'doc saved with new question',
        savedDoc: updatedQuestionsDoc
      })
    );
    res.end();
  }
}

exports.addQuestionRoute = addQuestionRoute;
