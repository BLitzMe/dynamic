const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let singleQuestion = {
  questionKey: { type: String },
  questionValue: { type: String },
  questionOptions: { type: [String] }
};

let questionDocs = new Schema(
  {
    schemaName: { type: String },
    questions: { type: [singleQuestion] }
  },
  { collection: 'questionsDocs' }
);

exports.questionsDocModel = mongoose.model('questionsDocs', questionDocs);
exports.singleQuestion = singleQuestion;
