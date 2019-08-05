/*
 //TODO: finish documentation
!! Function Below
* Simply finds the schemasModel Document and hence pulls all schema Objects from the
* database 

*/

const express = require('express'),
  getSchemasModelRoute = express.Router(),
  schemasModel = require('../../../models/schemasModel');

getSchemasModelRoute.get('/', (req, res) => {
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

      res.status(200).send(tempData);
    }
  });
});

module.exports = getSchemasModelRoute;
