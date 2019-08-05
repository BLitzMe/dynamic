/* 
  //TODO: finish documentation
  !! The functions below: 
  * 1. /removeOneSchema takes in a schemaName, then searches through the schema Objects
  *     to match the string passed through the parameter. Upon match, the respective 
  *     schema is 'pulled' form the array
  * 2. /removeOneFieldValue takes in a fieldToRemove, which is an array element
  *    in the schemaFields property, and schemaName. When a schemaName is matched
  *    an element is removed from the schemaFields Array.
  */

const express = require('express'),
  removeSchemasModelRoute = express.Router(),
  multer = require('multer'),
  schemasModel = require('../../../models/schemasModel');

removeSchemasModelRoute.put('/removeOneSchema', (req, res) => {
  //remove one schema
  schemasModel.mongo
    .updateOne(
      {},
      {
        $pull: { dbSchemas: { schemaName: req.body.schemaName } }
      },
      { multi: false }
    )
    .catch(err => {
      res.send('some error occured: \n' + err);
    })
    .then(() => {
      res.send('schema deleted successfully');
    });
});
removeSchemasModelRoute.put('/removeOneFieldValue', (req, res) => {
  //remove one field
  schemasModel.mongo
    .updateOne(
      {
        'dbSchemas.schemaName': req.body.schemaToSearch
      },
      {
        $pull: {
          'dbSchemas.$.schemaFields': req.body.fieldToRemove
        }
      }
    )
    .catch(err => {
      res.send('some error occured: \n' + err);
    })
    .then(() => {
      res.send(
        'schemaField value ' + req.body.fieldToRemove + ' deleted successfully'
      );
    });
});
module.exports = removeSchemasModelRoute;
