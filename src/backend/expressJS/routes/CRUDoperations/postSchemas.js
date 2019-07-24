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
  schemasModel = require('../../models/schemasModel');

postSchemasModelRoute.post('/enterNewSchema', (req, res) => {
  let newSchema = {
    schemaName: req.body.schemaName,
    schemaFields: req.body.schemaFields
  };
  console.log(
    'this is how the new schema looks like ' + '\n' + newSchema + '\n'
  );
  console.log('id of the dbSchemas object ' + req.body._id);
  schemasModel.mongo
    .updateOne(
      {
        _id: req.body._id
      },
      {
        $push: {
          dbSchemas: newSchema
        }
      }
    )
    .then(log => {
      console.log('the schema has been saved and here is the log \n' + log);
      res.status(200).send('new schema saved successfully');
    });
});

postSchemasModelRoute.post('/enterNewField', (req, res) => {
  //enter new data
  schemasModel.mongo
    .updateOne(
      {
        'dbSchemas.schemaName': req.body.schemaToSearch
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
});

module.exports = postSchemasModelRoute;
