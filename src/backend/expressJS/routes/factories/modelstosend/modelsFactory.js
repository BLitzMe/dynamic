const express = require('express'),
  modelsFactoryRoute = express.Router(),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  Schema = mongoose.Schema,
  schemasModel = require('../../../models/schemasModel');

let finishedModelsArray = [];
modelsFactoryRoute.get('/pullSingleModel', (req, res) => {
  let tempModel = mongoose.model(req.body.collectionName, req.body.schemaData);
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
      res.status(200).send(data);
    }
  });
});
modelsFactoryRoute.post('/pullModelsArray', (req, res) => {
  console.log(req.body);
  let tempSchemasArray = _.flatten(req.body.monkey); //flatten received models array once more to prepare it for looping

  console.log(tempSchemasArray); //!! remove this check after
  //!!successfull receipt of models array on the front end
  // res.status(200).send(tempSchemasArray);
  generateModelsArray(tempSchemasArray)
    .catch(err => {
      res
        .status(500)
        .send(
          'the request for compiled models array failed with this error ' + err
        );
    })
    .then(() => {
      res.status(200).send(finishedModelsArray);
    });
});

function generateModelsArray(tempSchemasArray) {
  return new Promise((resolve, reject) => {
    try {
      tempSchemasArray.forEach(element => {
        let tempModel = mongoose.model(
          element.collectionName,
          element.schemaData
        );
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
            finishedModelsArray.push(data);
          }
        });
      });
    } catch (error) {
      reject(console.log('an error occured while compiling models array'));
    }
  }).catch(err => {
    console.log('an error occured while compiling models array');
  });
}
module.exports = modelsFactoryRoute;
