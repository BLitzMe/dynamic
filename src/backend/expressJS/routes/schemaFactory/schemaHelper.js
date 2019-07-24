const mongoose = require('mongoose'),
  eypress = require('express'),
  Schema = mongoose.Schema,
  mongooseDynamic = require('mongoose-dynamic-schemas'),
  modelsArray = [];

exports.loopForTests = function loopForTests(modelsArray, reqBody) {
  let element = modelsArray[0];
  let tempModel = mongoose.model(element.collectionName, element.schemaData);

  let newModel = new tempModel({
    A1: reqBody.A1,
    A2: reqBody.A2,
    A3: reqBody.A3
  });

  newModel.save().then(() => {
    console.log('item saved properly');
  });

  /* modelsArray.forEach(element => {
    let tempModel = mongoose.model(element.collectionName, element.schemaData);
    tempModel.find((error, allInstances) => {
      if (error) {
        console.log(err);
      } else {
        let data = allInstances;
        console.log(
          '\n\n-------------------------------------------------------------\nthese are the instances of this model in the modelsArray in the database: ' +
            '\n' +
            data
        );
      }
    });
  }); */
};
// make function that loops through temp Data
// takes schema name and schema fields to make schemas

exports.loopForSchemas = function loopForSchemas(objectToLoop) {
  return new Promise((resolve, reject) => {
    try {
      let i;
      //loop through all avaible schemas and call the function to create models from that information
      for (i = 0; i <= objectToLoop[0].dbSchemas.length - 1; i++) {
        newSchema(objectToLoop[0].dbSchemas[i]);
      }
      resolve(modelsArray);
    } catch (error) {
      reject(
        console.log('could not produce the models array with error ' + error)
      );
    }
  }).catch(err => {
    console.log('an error occured ' + err);
  });
};

function newSchema(schemaTemplate) {
  let schemaName = schemaTemplate.schemaName;
  let schemaLooper;
  let newFieldsObject = {};

  createEmptySchema(schemaName).then(emptySchema => {
    for (
      schemaLooper = 0;
      schemaLooper <= schemaTemplate.schemaFields.length - 1;
      schemaLooper++
    ) {
      let tempKey = schemaTemplate.schemaFields[schemaLooper];
      //build an object of new fields that you can pass to schema.add
      newFieldsObject = Object.assign(
        {},
        {
          ...newFieldsObject,
          [tempKey]: typeof tempKey
        }
      );

    }
    emptySchema.add(newFieldsObject);
    /* console.log('obj inside empty schema\n' + JSON.stringify(emptySchema)); */
    let tempModel = new schemaNotModel(schemaName, emptySchema);

    modelsArray.push(tempModel);
  });
}
function createEmptySchema(schemaName) {
  return new Promise((resolve, reject) => {
    try {
      modelToWorkWith = new Schema({}, { collection: schemaName });

      resolve(modelToWorkWith);
    } catch (error) {
      reject(
        console.log(
          'the schema ' +
            schemaName +
            ' wasnt created properly with the error ' +
            error
        )
      );
    }
  });
}

//functionClass for schemaNotModel to pack in stuff together for later use
function schemaNotModel(collectionName, schemaData) {
  this.collectionName = collectionName;
  this.schemaData = schemaData;
}
