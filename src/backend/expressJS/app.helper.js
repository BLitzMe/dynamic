//* this deals with the problem of schema over writing: when a model is created from a schema anywhere in the app
//* it is not allowed to be created again. These functions support saving and retrieval of
//* globally saved schemas
const mongoose = require('mongoose'),
  _ = require('lodash');

//object to save schema name and model
exports.saveMongoModel = function saveMongoModel(schemaName, mongoModel) {
  this.schemaName = schemaName;
  this.mongoModel = mongoModel;
};

exports.savedModelsArray = [{ type: this.saveMongoModel }];

exports.checkModelExistence = function checkExistence(
  savedModelsArray,
  schemaName,
  schemaData,
  fieldUpdateFlag = false
) {
  let modelExists = false;
  let model;
  //check the global (input in this ftn as a parameter) savedModelsArray for the existence of
  //a model with this schema name
  for (let element of savedModelsArray) {
    //if found, equate it to local model, and exit with the model
    if (element.schemaName === schemaName && fieldUpdateFlag === false) {
      modelExists = true;
      model = element.mongoModel;
      break;
    } else if (element.schemaName === schemaName && fieldUpdateFlag === true) {
      savedModelsArray = _.pull(savedModelsArray, element);
      delete mongoose.connection.models[schemaName];
      model = mongoose.model(schemaName, schemaData);
      savedModelsArray.push(new this.saveMongoModel(schemaName, model));
      modelExists = true;
    }
  }
  if (modelExists === false) {
    //if not, save the new model in global array and exit with the model
    model = mongoose.model(schemaName, schemaData);
    savedModelsArray.push(new this.saveMongoModel(schemaName, model));
  }
  return model;
};
