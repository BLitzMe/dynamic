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
  upload = multer(),
  schemasHelper = require('./schemasHelper'),
  schemasModel = require('../../../models/schemasModel');

removeSchemasModelRoute.post('/removeDirtySchema', (req, res) => {
  schemasModel.mongo.findByIdAndDelete({ _id: req.body._id }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('the dirty schema was deleted' + result);
    }
  });
});

removeSchemasModelRoute.post(
  '/removeSchemaAndDoc',
  upload.none(),
  (req, res) => {
    //remove one schema and its doc
    schemasHelper.deleteSchemaAndDoc(req, res);
  }
);
/* removeSchemasModelRoute.put(
  '/removeOneFieldValue',
  upload.none(),
  (req, res) => {
    //remove one field
  }
);

async function removeField(req, res) {
  await schemasHelper.removeField(schemasModel, req, res);
  res
    .status(200)
    .json(
      'schemaField value ' + req.body.fieldToRemove + ' deleted successfully'
    );
} */
module.exports = removeSchemasModelRoute;
