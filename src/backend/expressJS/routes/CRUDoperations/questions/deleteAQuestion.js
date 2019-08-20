const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  delQuestionsRoute = express.Router(),
  quesModelObj = require('../../../models/questionsDocModel'),
  crudHelper = require('../../CRUDoperations/crudHelper');

delQuestionsRoute.post('/', upload.none(), (req, res) => {
  console.log(req.body);
  delQuestion(req, res);
});

async function delQuestion(req, res) {
  let schemaDocAfterDel = await crudHelper.removeField(req);

  res.write(
    JSON.stringify({
      message: 'field added to db schemas doc',
      newDoc: schemaDocAfterDel
    })
  );
  let updatedDoc = await quesModelObj.questionsDocModel.findOneAndUpdate(
    {
      schemaName: req.body.schemaName
    },
    {
      $pull: {
        questions: { questionKey: req.body.keyToRemove }
      }
    },
    { new: true }
  );
  res.status(200).write(
    JSON.stringify({
      message: 'deleted field from schema fields and question from doc',
      updatedDoc: updatedDoc
    })
  );
  res.end();
}
exports.delQuestionsRoute = delQuestionsRoute;
