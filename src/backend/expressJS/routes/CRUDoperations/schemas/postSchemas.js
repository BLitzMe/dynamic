/* 
  //TODO: finish documentation
  !! The functions below: 
  * 1. /enterNewSchema takes in a schemaName and SchemaFields from the font end
  *   and adds it to the array of the SchemasTable in the attached database
  * 2. /enterNewField takes in a schemaToSearch parameter from the front end. 
  *   Used to cycle through schema Objects to find which objects schemaName matches 
  *   with the schemaToSearch parameter. Then the newField Parameter is added
  *   to the schemaFields property of the matches schema Object
  */

const express = require('express'),
  postSchemasModelRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  crudHelper = require('../crudHelper'),
  schemasModel = require('../../../models/schemasModel');

postSchemasModelRoute.post('/enterNewSchema', upload.none(), (req, res) => {
  enterSchema(req, res);
});
async function enterSchema(req, res) {
  let updatedDoc = await crudHelper.enterNewSchema(req, res);
  res.write(
    JSON.stringify({ message: 'newSchema Entered', updatedDoc: updatedDoc })
  );
  res.end();
}

postSchemasModelRoute.post('/enterNewField', upload.none(), (req, res) => {
  console.log(req.body);
  //enter new data
  enterFields(schemasModel, req, res);
});

async function enterFields(schemasModel, req, res) {
  await crudHelper.enterNewFieldsToSchema(schemasModel, req, res);
  res.status(200).json('new field added successfully');
}
exports.postSchemasModelRoute = postSchemasModelRoute;
