const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userInfo = {
  Name: { type: String },
  Vorname: { type: String },
  Geburtsname: { type: String },
  Postleitzahl: { type: String },
  Stadt: { type: String },
  Strasse: { type: String },
  Land: { type: String },
  Provinz: { type: String }
};
let answerObj = {
  questionKey: {type: String},
  questionValue: { type: String },
  answerValue: { type: String },
  answerKey:{type:Number}
};
let answers = new Schema(
  {
    date: { type: Date },
    userInfo: { type: userInfo },
    answerObj: { type: [answerObj] }
  },
  {
    collection: 'answers'
  }
);

exports.answersModel = mongoose.model('answers', answers);
