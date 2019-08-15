const mongoose = require('mongoose'),
  express = require('express'),
  Schema = mongoose.Schema,
  questionSchemasArray = [],
  answersSchemasArray = [],
  _ = require('lodash');

exports.loopForTests = function loopForTests(questionSchemasArray, reqBody) {
  /*   let element = modelsArray[0];
  let tempModel = mongoose.model(element.schemaName, element.schemaData);

  let newModel = new tempModel({
    A1: reqBody.A1,
    A2: reqBody.A2,
    A3: reqBody.A3
  });

  newModel.save().then(() => {
    console.log('item saved properly');
  }); */

  questionSchemasArray.forEach(element => {
    let tempModel = mongoose.model(element.schemaName, element.schemaData);
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
  });
};
// make function that loops through temp Data
// takes schema name and schema fields to make schemas
// * this is for questions
exports.loopForQuestionsSchemas = function loopForSchemas(objectToLoop) {
  return new Promise((resolve, reject) => {
    try {
      let i;
      //loop through all avaible schemas and call the function to create models from that information
      for (i = 0; i <= objectToLoop[0].dbSchemas.length - 1; i++) {
        newQuestionsSchema(objectToLoop[0].dbSchemas[i]);
      }
      resolve(questionSchemasArray);
    } catch (error) {
      reject(
        console.log('could not produce the models array with error ' + error)
      );
    }
  }).catch(err => {
    console.log('an error occured ' + err);
  });
};

//* this is for answers
function newQuestionsSchema(schemaTemplate) {
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

    questionSchemasArray.push(tempModel);
  });
}

exports.loopforAnswersSchemas = function loopForAnswersSchemas(objectToLoop) {
  return new Promise((resolve, reject) => {
    try {
      let i;
      // change this in order to set default information of a customer
      let fixedSchemaObject = {
        PersonalInfo: {
          Name: { type: String },
          Age: { type: String },
          Ethnicity: { type: String },
          Height: { type: String }
        }
      };
      //loop through all avaible schemas and call the function to create models from that information
      for (i = 0; i <= objectToLoop[0].dbSchemas.length - 1; i++) {
        newAnswersSchema(objectToLoop[0].dbSchemas[i], fixedSchemaObject);
      }
      resolve(answersSchemasArray);
    } catch (error) {
      reject(
        console.log(
          'could not produce the new questions schema array with error ' + error
        )
      );
    }
  }).catch(err => {
    console.log('an error occured ' + err);
  });
};

//* these functions support the two functions above

function newAnswersSchema(schemaTemplate, fixedSchemaObject = {}) {
  let schemaName = schemaTemplate.schemaName;
  let schemaLooper;
  let newFieldsObject = {};

  createEmptySchema(schemaName, fixedSchemaObject).then(emptySchema => {
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
          Answers: {
            ...newFieldsObject.Answers,
            [tempKey]: { type: typeof tempKey }
          }
        }
      );
    }
    emptySchema.add(newFieldsObject);
    /* console.log('obj inside empty schema\n' + JSON.stringify(emptySchema)); */
    let tempModel = new schemaNotModel(schemaName, emptySchema);

    answersSchemasArray.push(tempModel);
  });
}
function createEmptySchema(schemaName, fixedSchemaObjects) {
  return new Promise((resolve, reject) => {
    try {
      let modelToWorkWith = new Schema(fixedSchemaObjects, {
        collection: schemaName
      });

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
function schemaNotModel(schemaName, schemaData, documentId = 'empty') {
  this.schemaName = schemaName;
  this.documentId = documentId;
  this.schemaData = schemaData;
}

//loop through the models array and compare the collection name of each component with
//the collection name of the first element. if it matches, remove the first element.
//time complexity O(n)
exports.removeDuplicates = function removeDuplicates(modelsArray, result) {
  modelsArray = result;
  for (let j = 1; j <= modelsArray.length - 1; j++) {
    if (modelsArray[0].schemaName === modelsArray[j].schemaName) {
      modelsArray = _.pullAll(modelsArray, [modelsArray[0]]);
      j = 0;
    }
  }
  return modelsArray;
};
