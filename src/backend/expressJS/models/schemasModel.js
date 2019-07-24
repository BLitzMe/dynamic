const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let databaseSchema = new Schema({
  schemaName: { type: String },
  schemaFields: [String]
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
