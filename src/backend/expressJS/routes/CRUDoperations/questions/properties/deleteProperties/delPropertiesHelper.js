const schemasModel = require('../../../../../models/schemasModel');

exports.schemaExists = async function schemaExists(req) {
  let exists = false;
  await schemasModel.mongo.findOne(
    { 'dbSchemas.schemaName': req.body.schemaName },
    'dbSchemas.$',
    (err, result) => {
      console.log(result);
      if (result !== (undefined || null)) {
        exists = true;
      }
    }
  );
  return exists;
};

exports.docIdExists=async(tempModel)=>{
  let exists=false;
  await schemasModel.find()
}