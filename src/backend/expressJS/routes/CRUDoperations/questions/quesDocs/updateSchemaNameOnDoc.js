const express = require('express'),
  multer = require('multer'),
  upload = multer(),
  updateSchemaNameRoute = express.Router(),
  quesModelObj = require('../../../../models/questionsDocModel'),
  crudHelper = require('../../crudHelper');

updateSchemaNameRoute.post('/', upload.none(), (req, res) => {
  updateSchemaName(req, res);
});

async function updateSchemaName(req, res) {
  console.log(req.body);
  let updatedDoc = await quesModelObj.questionsDocModel.findOneAndUpdate(
    { schemaName: req.body.currentSchemaName },
    {
      $set: {
        schemaName: req.body.newSchemaName
      }
    },
    { new: true }
  );
  res.write(
    JSON.stringify({
      message: 'schemaName changed on ques doc',
      updatedDoc: updatedDoc
    })
  );

  updatedDoc = await crudHelper.updateSchemaNameOnDbSchemasDoc(req);
   res.write(
    JSON.stringify({
      message: 'schemaName updated on dbSchemas doc',
      updatedDoc: updatedDoc
    })
  );
  res.status(200).end();
}
exports.updateSchemaNameRoute = updateSchemaNameRoute;
