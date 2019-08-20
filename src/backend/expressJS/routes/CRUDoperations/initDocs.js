const express = require('express'),
  initDocsRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  schemasModel = require('../../models/schemasModel'),
  crudHelper = require('./crudHelper'),
  quesDocModel = require('../../models/questionsDocModel');

initDocsRoute.post('/initAllDocs', upload.none(), (req, res) => {
  initAllDocs(res);
});
initDocsRoute.post('/initOneDoc', (req, res) => {
  initDocCallWrapper(req, res);
});
async function initAllDocs(res) {
  let allSchemas = await schemasModel.mongo.find({});
  allSchemas = allSchemas[0].dbSchemas;
  for (let schema of allSchemas) {
    await crudHelper.initOneDoc(schema);
  }
  let allQuesDocs = await quesDocModel.questionsDocModel.find({});
  res.status(200).json(allQuesDocs);
}

async function initDocCallWrapper(req, res) {
  let schema = await crudHelper.getSchema(req);
  let updatedDoc = await crudHelper.initOneDoc(schema);
  res.write(
    JSON.stringify({
      message: 'single doc updated successfully',
      updatedDoc: updatedDoc
    })
  );
  res.end();
}

exports.initDocsRoute = initDocsRoute;
