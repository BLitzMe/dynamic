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
  console.log(req.body);
  let newdbSchema = {
    schemaName: req.body.schemaName, //!!
    schemaFields: req.body.schemaFields, //!!
    documentId: req.body.documentId
  };
  let badSchemaField = false;
  for (let field of req.body.schemaFields) {
    if (
      field ===
      ('once' ||
        'on' ||
        'emit' ||
        '_events' ||
        'db' ||
        'get' ||
        'set' ||
        'init' ||
        'isNew' ||
        'errors' ||
        'schema' ||
        'options' ||
        'modelName' ||
        'collection' ||
        '_pres' ||
        '_posts' ||
        'toObject')
    ) {
      badSchemaField = true;
    }
  }
  if (badSchemaField === true) {
    res.status(501).json("valid field name wasn't entered. Please try again");
  } else {
    this.enterNewSchema(newdbSchema, schemasModel, req, res);
  }
});
exports.enterNewSchema = function enterNewSchema(
  newdbSchema,
  schemasModel,
  req,
  res
) {
  console.log(
    'this is how the new schema looks like ' + '\n' + newdbSchema + '\n'
  );
  //console.log('id of the dbSchemas object ' + req.body._id);
  schemasModel.mongo
    .findOneAndUpdate(
      {
        // search for the first document in the databaseschemas collection that has an
        //array of dbschemas object and append the new object at the end
      },
      {
        $push: {
          dbSchemas: newdbSchema
        }
      }
    )
    .then(log => {
      console.log('the schema has been saved and here is the log \n' + log);
      res.status(200).json('new schema saved successfully');
    });
};

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
