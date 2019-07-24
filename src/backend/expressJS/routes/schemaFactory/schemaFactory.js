/* 
  TODO: finish documentation 
  


*/

const express = require('express'),
  schemaFactoryRoute = express.Router(),
  multer = require('multer'),
  mongoose = require('mongoose'),
  schemasModel = require('../../models/schemasModel'),
  Schema = mongoose.Schema,
  mongooseDynamic = require('mongoose-dynamic-schemas'),
  schemasHelper = require('./schemaHelper');

let modelsArray = [];
//route to generate schemas for consumption by the back end based
// on the schemas table of the database. Not a final version
/* 
!! Route Functionality
* loop for schemas function goes through each schema object, makes another object
* including the schema name and all the fields inserted in a mongoose schema. This new
* object is then stored in an array which can be used to pull out the required 
* information for read and write operation using mongoose model functions. 

 */
schemaFactoryRoute.get('/', (req, res) => {
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
        .loopForSchemas(tempData)
        .then(result => {
          modelsArray = result;
          schemasHelper.loopForTests(modelsArray, req.body);

          res.status(200).write(JSON.stringify(modelsArray));
        })
        .then(() => {
          res.status(200).write('looper for finding finisehd');
          res.end();
          console.log(
            '---------------------------------\n\nmodels array looks like this \n' +
              modelsArray
          );
        });
    }
  });
});

exports.schemaFactoryRoute = schemaFactoryRoute;
exports.modelsArray = modelsArray;
