const schemasModel = require('../../../../models/schemasModel'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  appHelper = require('../../../../app.helper');

let globalModelsArray = appHelper.savedModelsArray;
exports.updateFields = function updateFields(
  tempModel,
  fieldsToUpdateArray,
  docId = 'default',
  collectionName = 'defaultCollName'
) {
  let searchParams = {};
  if (docId !== 'default') {
    searchParams = { _id: docId }; //take care of the case where new document is saved and the id is available
  } //if the document was already there, simply update
  fieldsToUpdateArray.forEach(element => {
    tempModel.findOneAndUpdate(searchParams, {
      $set: { [element.key]: element.value }
    });
  });
  //update the doc id after the creation of new document for the said schema
  //when the arguements are provided
  if (docId !== 'default' && collectionName !== 'defaultCollName') {
    this.updateSchemadocId(collectionName, docId);
  }
};
exports.updateSchemadocId = async function updatedocId(schemaName, docId) {
  await schemasModel.mongo.findOneAndUpdate(
    {
      'dbSchemas.schemaName': schemaName
    },
    {
      $set: {
        'dbSchemas.$.documentId': docId
      }
    }
  );
};

exports.createModel = function createModel(schemaFields, collectionName) {
  let tempSchema = new mongoose.Schema({});
  let tempObject = {};
  //create schema on the fly and then the model so functions can be performed on it
 
  schemaFields.forEach(element => {
    tempObject = Object.assign(
      {},
      {
        ...tempObject,

        [element.fieldName]:{
          question: {type: String},
          fieldOptions: {type: [Number]}
        } 
      }
    );
  });
  tempSchema.add(tempObject);

  // search global models array for the model, if not, creat it and get the model instance back
  let tempModel = appHelper.checkModelExistence(
    globalModelsArray,
    collectionName,
    tempSchema
  );
  return tempModel;
};

exports.constructKeyValArray = function keyValArray(
  schemaFieldsArray,
  fieldsToUpdateArray
) {
  //fill temp array with field names

  let tempArray = [];
  for (let ele of schemaFieldsArray) {
    tempArray.push(ele.fieldName);
  }
  let tempArrayTwo = [];
  let keyValArray = [];
  //* strict copy the filedstoupdatearray into key val array.

  fieldsToUpdateArray.forEach(element => {
    let temp;
    temp = new keyValObj(element.key, element.value);
    keyValArray.push(temp);
    tempArrayTwo.push(element.key);
  });
  //* Then take difference of an array with key values of FTUArray and schema fields array

  let diff = _.difference(tempArray, tempArrayTwo); //* then simply add the keys of the difference array with empty values to

  //* the key val array that includes the difference of FTUA and schema fields
  //* if the difference exists at all
  if (diff.length > 0) {
    for (let element of diff) {
      let temp;
      temp = new keyValObj(element, '');
      keyValArray.push(temp);
    }
  }

  return keyValArray;
};

function keyValObj(key, val) {
  this.key = key;
  this.val = val;
}
