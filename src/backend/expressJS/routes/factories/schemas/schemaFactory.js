/* 
  TODO: finish documentation 
  


*/

const express = require('express'),
  schemaFactoryRoute = express.Router(),
  schemasModel = require('../../../models/schemasModel'),
  schemasHelper = require('./schemaHelper');

let questionSchemasArray = [];
let answersSchemasArray = [];

//route to generate schemas for consumption by the back end based
// on the schemas table of the database. Not a final version
/* 
!! Route Functionality
* loop for schemas function goes through each schema object, makes another object
* including the schema name and all the fields inserted in a mongoose schema. This new
* object is then stored in an array which can be used to pull out the required 
* information for read and write operation using mongoose model functions. 

 */
schemaFactoryRoute.get('/questionsSchemas', (req, res) => {
  schemasModel.mongo.find((err, allSchemasModel) => {
    if (err) {
      console.log(err);
    } else {
      let tempData = allSchemasModel;
      console.log(
        'these are the schemas in the schemas model in the database: ' +
          '\n' +
          tempData
      );
      schemasHelper
        .loopForQuestionsSchemas(tempData)
        //zaba
        .then(result => {
          //only copy result to models array if there are new values. Use Venn diagrams for it. Function in
          //helper file
          questionSchemasArray = schemasHelper.removeDuplicates(
            questionSchemasArray,
            result
          );
          //schemasHelper.loopForTests(modelsArray, req.body);

          res.status(200).send(questionSchemasArray);
        })
        .then(() => {
          /* res.status(200).write('looper for finding finisehd');
          res.end(); */

          console.log(
            '---------------------------------\n\nmodels array looks like this \n' +
              questionSchemasArray
          );
        });
    }
  });
});
schemaFactoryRoute.get('/answersSchemas', (req, res) => {
  schemasModel.mongo.find((err, allSchemasModel) => {
    if (err) {
      console.log('error occured while generating answers schemas: ' + err);
    } else {
      let tempData = allSchemasModel;
      schemasHelper.loopforAnswersSchemas(tempData).then(result => {
        answersSchemasArray = schemasHelper.removeDuplicates(
          answersSchemasArray,
          result
        );
        console.log('answers schema array: \n' + answersSchemasArray);
        res.status(200).send(answersSchemasArray);
      });
    }
  });
});
exports.schemaFactoryRoute = schemaFactoryRoute;
exports.questionSchemasArray = questionSchemasArray;
