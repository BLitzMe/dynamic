const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  delQuesDocRoute = express.Router(),
  quesModelObj = require('../../../../models/questionsDocModel'),
  crudHelper = require('../../crudHelper');

delQuesDocRoute.post('/', upload.none(), (req, res) => {
  delQuesDoc(req, res);
});

async function delQuesDoc(req, res) {
  res.write(
    JSON.stringify({
      message: 'recieved body is as follows',
      receivedBody: req.body
    })
  );
  let newDoc = await crudHelper.deleteSchemaOndbSchemas(req);
  res.write(
    JSON.stringify({
      message: 'schema deleted from db schemas Doc',
      deletedDoc: newDoc
    })
  );
  let updatedDoc = await quesModelObj.questionsDocModel.findOneAndDelete({
    schemaName: req.body.schemaName
  });
  res.status(200).write(
    JSON.stringify({
      message: 'ques Doc Successfully deleted',
      newDoc: updatedDoc
    })
  );
  res.end();
}
exports.delQuesDocRoute = delQuesDocRoute;
