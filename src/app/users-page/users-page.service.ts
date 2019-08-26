import { AnswersDoc, UserInfo } from './../Models/ansersDocModel';
import { UserData } from './../Models/userDataIF';
import { GeneralServiceService } from './../general-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ModelsInformationObject } from '../Models/modelsInformationObjectModel';
import * as _ from 'lodash';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersPageService {
  receivedSchemasArray: Observable<Array<ModelsInformationObject>>;
  backendUri = this.genService.backendUri;
  answerDoc: AnswersDoc = new AnswersDoc();
  resOptions = this.genService.textResponseHttpOptions;
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
  sendAnswersDoc$(dataToSend) {
    return this.http.post(
      this.backendUri + '/createAnswersDoc',
      dataToSend,
      this.genService.generalHttpOptions
    );
  }
  getAllAnswerDocs$(): Observable<AnswersDoc[]> {
    return this.genService.getAllAnswerDocs$().pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
  getJsonObj$(dataToSend): Observable<JSON> {
    return this.http
      .post<JSON>(
        this.backendUri + '/getJsonObject',
        dataToSend,
        this.resOptions
      )
      .pipe(
        map(result => {
          const pipedData = JSON.parse(result.toString());
          return pipedData;
        })
      );
  }
}
// !! need to send schemaName and schema data, also array of
// !! field value update objects to update
