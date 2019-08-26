import { QueryValueType } from '@angular/compiler/src/core';

export class AnswersDoc {
  date: Date;
  userInfo: UserInfo;
  answerObj: AnswerObj[] = [];
}

export class AnswerObj {
  constructor(questionKey: string, questionValue: string, answerValue: string, answerKey?:number) {
    this.questionKey = questionKey;
    this.questionValue = questionValue;
    this.answerValue = answerValue;
    this.answerKey=answerKey;
  }
  questionKey: string;
  questionValue: string;
  answerValue: string;
  answerKey:number
}

export class UserInfo {
  Name: string;
  Vorname: string;
  Geburtsname: string;
  Postleitzahl: string;
  Stadt: string;
  Strasse: string;
  Land: string;
  Provinz: string;
}
