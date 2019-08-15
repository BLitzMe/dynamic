const crudHelper = require('../../crudHelper'),
  propHelper = require('../properties/popertiesHelper');

/* //*
 *  1. require current field from front end
 *  2. remove current field on dbschemas doc
 *  3. add new field on dbschemas doc
 *  4. extract schema fields array , document id, and schema name from this doc
 *  5. unset the old key on the old doc
 *  6. extract the doc from the old id
 *  6.5 delete the old doc
 *  7. make a doc from old docs key values minus old key plus new key with old key's value
 *  8. save this doc
 *  9. update the doc id on db schemas object
 *
 *   REQUIRED FIELDS:
 *  1. schemaName
 *  2. schemaFields
 *  3. newField
 *  4. fieldToRemove
 *  5. questionValue
 *
 * *
 *
 */
exports.updateFields = async function updateFields(schemasModel, req, res) {
  //*step one
  let newSchemaFields;
  let docId;
  console.log('-------------the received body--------------');
  console.log(req.body);
  const removeF = await crudHelper.removeField(schemasModel, req, res); // *step two
  const addNewF = await crudHelper.enterNewFieldsToSchema(schemasModel, req); //* step three
  console.log(removeF, addNewF);

  let schema = await crudHelper.getSchema(req);
  docId = schema.documentId;
  if (docId !== '') {
    newSchemaFields = schema.schemaFields;
    let tempModel = await crudHelper.createModel(
      newSchemaFields,
      req.body.schemaName,
      true
    );
    //inorder to accomodate new fields, followin only works when field to remove is not empty
    if (req.body.fieldToRemove !== (undefined && null && '')) {
      await tempModel.findOneAndUpdate(
        //*step five
        { _id: docId },
        {
          $unset: { [req.body.fieldToRemove]: '' }
        },
        { multi: false },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
    }

    let newDocFields;

    newDocFields = await tempModel.findOne({ _id: docId }, (err, result) => {
      //*step six
      if (err) {
        console.log(err);
      }
    });
    newDocFields = newDocFields._doc;
    console.log(newDocFields);
    //delete unnecessary fields from
    delete newDocFields._id;
    delete newDocFields.__v;
    console.log(
      '------------------------after deletion--------------------------------'
    );
    console.log(newDocFields);

    await tempModel.findOneAndDelete({ _id: docId });
    //*step seven
    newDocFields = Object.assign(
      {},
      {
        ...newDocFields,
        [req.body.newField]: req.body.questionValue
      }
    );
    console.log('\nadded new field with old value to newDocFields\n');
    console.log(newDocFields);
    let newModel = await new tempModel(newDocFields);
    let newDocId;
    console.log(
      '\n----------------------- step sven done----------------------'
    );
    //*step eight
    await newModel.save((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          '\n----------------------- step eight done----------------------'
        );
        console.log('\n ' + doc);
        newDocId = doc._id;
        console.log('new doc id');
        console.log(newDocId); //*step nine
        propHelper.updateSchemadocId(req.body.schemaName, newDocId);
        console.log(
          '\n----------------------- step nine done----------------------'
        );
        res.status(200).json('field with doc updated successfully');
      }
    });
  } else {
    res.status(200).json('field without doc updates successfully');
  }
};

//delete a field
/* //*
 *   1. delete entry on db schema doc
 *   2. get matching schema and extract data after dbschema doc edit
 *   3. create new model to extract data from doc
 *   4. extract key value pairs from existing doc
 *   5. delete old doc
 *   6. shake existing doc
 *   7. create new doc with shook doc and save it
 *   8. update doc id on dbschema doc
 *
 *    REQUIRED BODY
 *    1. schemaName
 *    2. schemaFields
 *    3. fieldToRemove
 */
exports.deleteField = async (schemasModel, req, res) => {
  console.log('delete ping');
  let newSchemaFields;
  let docId;
  await crudHelper.removeField(schemasModel, req, res); // *step one
  let schema = await crudHelper.getSchema(req); //*step two
  docId = schema.documentId;
  if (docId !== '') {
    newSchemaFields = schema.schemaFields;
    let tempModel = await crudHelper.createModel(
      //*step three
      newSchemaFields,
      req.body.schemaName,
      true
    );
    let newDocFields;

    newDocFields = await tempModel.findOne({ _id: docId }, (err, result) => {
      //*step four
      //*step six
      if (err) {
        console.log(err);
      }
    });
    newDocFields = newDocFields._doc;

    await tempModel.findOneAndDelete({ _id: docId }); //*step five
    delete newDocFields._id; //*step six
    delete newDocFields.__v;

    let newModel = await new tempModel(newDocFields);
    let newDocId;
    await newModel.save((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        newDocId = doc._id;
        propHelper.updateSchemadocId(req.body.schemaName, newDocId);
        res.status(200).json('field deleted and doc copied successfully');
      }
    });
  } else {
    res.status(200).json('field on db schemas object deleted successfully');
  }
};
