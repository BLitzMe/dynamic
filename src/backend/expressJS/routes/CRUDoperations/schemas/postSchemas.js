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
  schemasModel = require('../../../models/schemasModel');

postSchemasModelRoute.post('/enterNewSchema', (req, res) => {
  let newdbSchema = {
    schemaName: req.body.schemaName, //!!
    schemaFields: req.body.schemaFields, //!!
    documentId: req.body.documentId
  };
  this.enterNewSchema(newdbSchema, schemasModel, req, res);
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
      res.status(200).send('new schema saved successfully');
    });
};

postSchemasModelRoute.post('/enterNewField', (req, res) => {
  //enter new data
  this.enterNewFieldsToSchema(schemasModel, res, req);
});
exports.enterNewFieldsToSchema = function enterNewFields(
  schemasModel,
  res,
  req
) {
  schemasModel.mongo
    .updateOne(
      {
        'dbSchemas.schemaName': req.body.collectionName
      },
      {
        $push: {
          'dbSchemas.$.schemaFields': req.body.newField
        }
      }
    )
    .then(() => {
      res.send('new field added successfully');
    });
};
exports.postSchemasModelRoute = postSchemasModelRoute;
