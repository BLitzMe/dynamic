import { catchError, tap, map, mergeAll } from 'rxjs/operators';
import { GeneralServiceService } from './../general-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionsProperties } from '../Models/getPropertiesIF';
import { Observable, of, from, merge, scheduled, combineLatest } from 'rxjs';
import { DbSchemaObject, DbSchemasObject } from './../Models/dbSchemasModel';
import * as _ from 'lodash';
import { Promise } from 'q';
@Injectable({
  providedIn: 'root'
})
export class AdminsPageService {
  // collct schemas
  backendUri = this.genService.backendUri;
  schemas: DbSchemaObject[];
  dbSchemasArray$: Observable<
    Array<DbSchemaObject>
  > = this.genService.dbSchemasArray$.pipe(
    map((result: DbSchemasObject) => {
      console.log(result[0]);
    }),
    catchError(err => {
      console.log(err);
      return of(null);
    })
  );
  questionsPropertiesArray: QuestionsProperties[] = [];

  constructor(
    private http: HttpClient,
    private genService: GeneralServiceService
  ) {}

  deleteSchema(schemaName) {
    return this.http.put(
      this.backendUri + '/removeOneSchema',
      { schemaName },
      this.genService.generalHttpOptions
    );
  }
  deleteOneField(fieldName) {
    return this.http.put(
      this.backendUri + '/removeOneSchema',
      { fieldName },
      this.genService.generalHttpOptions
    );
  }
  postNewSchema(formData) {
    // formdata = schemaName, schemaFields[]
  }
  postNewField(formData) {
    // formdata = collectionName, fieldName
  }
  addProperties() {}

  getQuestionsProperties$(
    schemaName?: string,
    schemaFields?: string[]
  ): Observable<QuestionsProperties[]> {
    return this.genService.getQuestionProperties(schemaName, schemaFields).pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
  createNewSchema$(dataToSend) {
    console.log(dataToSend);
    return this.http.post(
      this.backendUri + '/postDatabaseSchemas/enterNewSchema',
      dataToSend
    );
  }
  deleteSchema$(deleteParameters) {
    console.log(deleteParameters);
    return this.http.post(
      this.genService.backendUri + '/deleteDatabaseSchemas/removeSchemaAndDoc',
      deleteParameters,
      this.genService.generalHttpOptions
    );
  }
  editSchemaName$(dataToSend) {
    return this.http.post(
      this.genService.backendUri + '/updateSchema/updateSchemaName',
      dataToSend
    );
  }
  editQuestionField$(dataToSend) {
    return this.http.post(
      this.genService.backendUri + '/updateField/updateField',
      dataToSend
    );
  }
  addNewField$(dataToSend) {
    return this.http.post(
      this.genService.backendUri + '/updateField/updateField',
      dataToSend
    );
  }
  addProperty$(dataToSend) {
    return this.http.post(
      this.genService.backendUri + '/updateProperties',
      dataToSend
    );
  }
  deleteField$(dataToSend) {
    return this.http.post(
      this.genService.backendUri + '/deleteField',
      dataToSend
    );
  }
}
