const express = require('express'),
  updatePropertiesRoute = express.Router(),
  mongoose = require('mongoose'),
  schemasModel = require('../../../models/schemasModel'),
  _ = require('lodash'),
  appHelper = require('../../../app.helper'),
  propHelper = require('./popertiesHelper');

// use the schema data available at the front end to
// save new values for fields of a specific schema
updatePropertiesRoute.post('/', (req, res) => {
  //!!function received three arguements, fields to put in,
  //!!name of collection and schema data to build the model
  let fieldsToUpdateArray = req.body.fieldsToUpdateArray; //!!

  /* let tempSchema = propHelper.createSchema(req.body.schemaFields);
  console.log(tempSchema);
 */
  let tempModel = propHelper.createModel(
    req.body.schemaFields,
    req.body.collectionName
  );

  // search for the collection in db, if not found create one
  //with the fields given
  console.log(req.body);

  let docIdExists = false;

  //search for a schema for the docId where the schemaName matches the schemaName provided
  schemasModel.mongo.findOne(
    { 'dbSchemas.schemaName': req.body.collectionName },
    'dbSchemas.schemaName dbSchemas.documentId',
    (err, schema) => {
      if (err) {
        console.log(err);
      }
      let compObj = schema.dbSchemas;
      compObj.forEach(element => {
        if (
          element.schemaName === req.body.collectionName &&
          element.documentId !== ''
        ) {
          //insert values to the keys if it does and turn the boolean true
          docIdExists = true;
          console.log('documentId exists');

          fieldsToUpdateArray.forEach(object => {
            tempModel.findOneAndUpdate(
              { _id: element.documentId },
              { $set: { [object.key]: object.value } },
              {},
              () => {
                let successMessage =
                  'new value: ' +
                  object.value +
                  'for key: ' +
                  object.key +
                  ' was successfully saved';
                console.log(successMessage);

                //res.write(successMessage);
              }
            );
          });
        }
        // save the new docuemnt and save the id on the schema object if it doesnt
      });
      if (docIdExists === false) {
        let tempModelObj = {};
        //construct a new key val obj to populate new model obj
        let newFieldsArray = propHelper.constructKeyValArray(
          req.body.schemaFields,
          req.body.fieldsToUpdateArray
        );
        console.log('\nnew fields array: \n' + newFieldsArray);
        newFieldsArray.forEach(tempObj => {
          tempModelObj = Object.assign(
            {},
            {
              ...tempModelObj,
              [tempObj.key]: tempObj.val
            }
          );
        });

        let newModel = new tempModel(tempModelObj);
        newModel.save((err, doc) => {
          if (err) {
            console.log('error in saving the new doc: ' + err);
          } else {
            console.log('\n saving doc id locally \n' + doc._id + '\n');
            doc._id;
            propHelper.updateSchemadocId(
              req.body.collectionName,
              doc._id,
              res,
              
              req
            );
          }
        });
      }
      res.status(200).send('\ndone');
    }
  );
});

exports.updatePropertiesRoute = updatePropertiesRoute;
