const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let databaseSchema = new Schema({
  schemaName: { type: String },
  documentId: { type: String },
  schemaFields: { type: [String] }
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
