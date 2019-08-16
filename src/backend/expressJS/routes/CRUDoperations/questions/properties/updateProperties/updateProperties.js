const express = require('express'),
  updatePropertiesRoute = express.Router(),
  multer = require('multer'),
  upload = multer(),
  updatePropHelper = require('./updatePropHelper'),
  schemasModel = require('../../../../../models/schemasModel'),
  propHelper = require('../popertiesHelper');

// use the schema data available at the front end to
// save new values for fields of a specific schema
updatePropertiesRoute.post('/', upload.none(), (req, res) => {
  //!!function received three arguements, fields to put in,
  //!!name of collection and schema data to build the model
  let fieldsToUpdateArray = [];

  let recObj = {
    key: req.body.keyOne,
    value: req.body.valueOne
  }; //!!

  fieldsToUpdateArray.push(recObj);
  console.log(fieldsToUpdateArray);

  /* let tempSchema = propHelper.createSchema(req.body.schemaFields);
  console.log(tempSchema);
 */

  let docIdExists = false;

  //search for a schema for the docId where the schemaName matches the schemaName provided
  schemasModel.mongo.findOne(
    { 'dbSchemas.schemaName': req.body.schemaName },
    'dbSchemas.$',
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      let testSchema = result.dbSchemas[0];
      console.log(testSchema);

      if (
        testSchema.schemaName === req.body.schemaName &&
        testSchema.documentId !== ''
      ) {
        //insert values to the keys if it does and turn the boolean true
        docIdExists = true;
        console.log('documentId exists');
        let currModel = propHelper.createModel(
          testSchema.schemaFields,
          req.body.schemaName
        );
        fieldsToUpdateArray.forEach(object => {
          currModel.findOneAndUpdate(
            { _id: testSchema.documentId },
            { $set: { [object.key]: object.value } },
            {},
            (err, result) => {
              console.log(result);
            }
          );
          res.status(200).json('old question value replaces');
        });
      }
      // save the new docuemnt and save the id on the schema object if it doesnt
      if (docIdExists === false) {
        let tempModelObj = {};
        //For a properSchema
        //construct a new key val obj to populate new model obj
        let newFieldsArray = propHelper.constructKeyValArray(
          req.body.schemaFields,
          fieldsToUpdateArray
        );
        console.log('\nnew fields array: \n' + newFieldsArray);
        //construct a filler for the new temp model object so the correct doc could be pulled
        newFieldsArray.forEach(keyValueEle => {
          tempModelObj = updatePropHelper.createFieldsObject(
            tempModelObj,
            keyValueEle
          );
        });
        let tempModel = propHelper.createModel(
          req.body.schemaFields,
          req.body.schemaName
        );
        let newModel = new tempModel(tempModelObj);
        newModel.save((err, doc) => {
          if (err) {
            console.log('error in saving the new doc: ' + err);
          } else {
            console.log('\n saving doc id locally \n' + doc._id + '\n');
            /*   doc._id; */
            //after creating and saving the doc, save the id on the db schemas schema
            propHelper.updateSchemadocId(
              req.body.schemaName,
              doc._id,
              res,
              req
            );
            res.status(200).json('\ndone');
          }
        });
      }
    }
  );
});

exports.updatePropertiesRoute = updatePropertiesRoute;
