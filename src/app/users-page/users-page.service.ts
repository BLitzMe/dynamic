import { AnswersDoc, UserInfo } from './../Models/ansersDocModel';
import { UserData } from './../Models/userDataIF';
import { GeneralServiceService } from './../general-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ModelsInformationObject } from '../Models/modelsInformationObjectModel';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class UsersPageService {
  receivedSchemasArray: Observable<Array<ModelsInformationObject>>;
  backendUri = this.genService.backendUri;
  answerDoc: AnswersDoc = new AnswersDoc();

  userInfoEdited = false;
  schemasArray: any;

  constructor(
    private http: HttpClient,
    private genService: GeneralServiceService
  ) {
    /*  this.globalModelsArraySave(); */
  }
  // * called currently on the components on init

  // * called manullay on a button push currently
  getQuestionDocs$() {
    return this.genService.getQuestionDocs$().pipe();
  }
  saveUserData(data: UserInfo) {
    this.answerDoc.userInfo = data;
    this.userInfoEdited = true;
    console.log(this.answerDoc);
  }
  checkAnswerDocDuplicates(currKey) {
    for (const obj of this.answerDoc.answerObj) {
      if (currKey === obj.questionKey) {
        return true;
      }
    }
    return false;
  }
  // !! need to send schemaName and schema data, also array of
  // !! field value update objects to update
}
