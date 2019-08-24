import { QueryValueType } from '@angular/compiler/src/core';

export class AnswersDoc {
  date: string;
  userInfo: UserInfo;
  answerObj: AnswerObj[] = [];
}

export class AnswerObj {
  constructor(questionKey: string, questionValue: string, answerValue: string) {
    this.questionKey = questionKey;
    this.questionValue = questionValue;
    this.answerValue = answerValue;
  }
  questionKey: string;
  questionValue: string;
  answerValue: string;
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
