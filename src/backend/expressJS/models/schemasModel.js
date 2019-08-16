const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaField = {
  fieldName: { type: String },
  fieldOptions: [String]
};
let databaseSchema = new Schema({
  schemaName: { type: String },
  documentId: { type: String },
  schemaFields: { type: [schemaField] }
});

let databaseSchemas = new Schema(
  {
    dbSchemas: [databaseSchema]
  },
  {
    collection: 'databaseSchemas'
  }
);

exports.mongo = mongoose.model('databaseSchemas', databaseSchemas);
exports.mongoTwo = databaseSchema;
