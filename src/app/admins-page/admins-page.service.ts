import { catchError, tap, map, mergeAll } from 'rxjs/operators';
import { GeneralServiceService } from './../general-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

import { QuestionDoc } from '../Models/questionDocIf';
@Injectable({
  providedIn: 'root'
})
export class AdminsPageService {
  // get question docs

  backendUri = this.genService.backendUri;
  resOptions = this.genService.textResponseHttpOptions;
  constructor(
    private http: HttpClient,
    private genService: GeneralServiceService
  ) {}
  getQuestionDocs$(): Observable<QuestionDoc[]> {
    return this.genService.getQuestionDocs$().pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
  updateSchemaName$(dataToSend) {
    return this.http.post(
      this.backendUri + '/updateSchemaNameOnQuesDoc',
      dataToSend,
      this.genService.textResponseHttpOptions
    );
  }
  updateQuestionKey$(dataToSend) {
    return this.http.post(
      this.backendUri + '/updateQuestionKey',
      dataToSend,
      this.resOptions
    );
  }
  updateQuestionValue$(dataToSend) {
    return this.http.post(
      this.backendUri + '/updateQuestionValues',
      dataToSend,
      this.resOptions
    );
  }
  additionalQuestionOptions$(dataToSend) {
    return this.http.post(
      this.backendUri + '/updateQuestionOptions/insertNewOptions',
      dataToSend,
      this.resOptions
    );
  }
  updateAnOption$(dataToSend) {
    return this.http.post(
      this.backendUri + '/updateQuestionOptions/updateAnOption',
      dataToSend,
      this.resOptions
    );
  }
  deleteAnOption$(dataToSend) {
    return this.http.post(
      this.backendUri + '/delOptions',
      dataToSend,
      this.resOptions
    );
  }
  // new question methods
  sendNewQuestionData$(dataToSend) {
    return this.http.post(
      this.backendUri + '/addAQuestion',
      dataToSend,
      this.resOptions
    );
  }
  deleteQuestion$(dataToSend) {
    return this.http.post(
      this.backendUri + '/deleteAQuestion',
      dataToSend,
      this.resOptions
    );
  }
  sendNewQuestionsDoc$(dataToSend) {
    return this.http.post(
      this.backendUri + '/createQuesDoc',
      dataToSend,
      this.resOptions
    );
  }
  deleteQuesDoc$(dataToSend) {
    return this.http.post(
      this.backendUri + '/deleteQuestionDocument',
      dataToSend,
      this.resOptions
    );
  }
}
