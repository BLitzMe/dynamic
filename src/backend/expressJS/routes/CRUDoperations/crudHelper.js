const appHelper = require('../../app.helper'),
  mongoose = require('mongoose'),
  schemasModel = require('../../models/schemasModel');

let globalModelsArray = appHelper.savedModelsArray;
exports.createModel = function createModel(
  schemaFields,
  schemaName,
  fieldUpdateFlag = false
) {
  let tempSchema = new mongoose.Schema({});
  let tempObject = {};
  //create schema on the fly and then the model so functions can be performed on it

  schemaFields.forEach(element => {
    tempObject = Object.assign(
      {},
      {
        ...tempObject,
        [element]: typeof element
      }
    );
  });
  tempSchema.add(tempObject);
  // search global models array for the model, if not, creat it and get the model instance back
  let tempModel = appHelper.checkModelExistence(
    globalModelsArray,
    schemaName,
    tempSchema,
    fieldUpdateFlag
  );
  return tempModel;
};
exports.enterNewFieldsToSchema = async function enterNewFields(
  schemasModel,
  req
) {
  await schemasModel.mongo
    .findOneAndUpdate(
      {
        'dbSchemas.schemaName': req.body.schemaName
      },
      {
        $push: {
          'dbSchemas.$.schemaFields': req.body.newField
        }
      }
    )
    .then(() => {
      console.log('pushed in the new field');
    });
};
exports.removeField = async function removeField(schemasModel, req, res) {
  await schemasModel.mongo
    .findOneAndUpdate(
      {
        'dbSchemas.schemaName': req.body.schemaName
      },
      {
        $pull: {
          'dbSchemas.$.schemaFields': req.body.fieldToRemove
        }
      }
    )
    .catch(err => {
      res.send('some error occured: \n' + err);
    })
    .then(() => {
      console.log('removed old schema field');
    });
};
exports.getSchema = async req => {
  let schema;
  let result = await schemasModel.mongo.findOne(
    //* step four
    { 'dbSchemas.schemaName': req.body.schemaName },
    'dbSchemas.$',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
  schema = result.dbSchemas[0];
  return schema;
};
