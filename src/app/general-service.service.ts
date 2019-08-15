import { DbSchemasObject } from './Models/dbSchemasModel';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ModelsInformationObject } from './Models/modelsInformationObjectModel';
import * as SchemaArrayActions from './redux/actions/schemaArrayActions';
import { QuestionsProperties } from './Models/getPropertiesIF';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  backendUri = 'http://localhost:4000'; // single place of truth for backendUri for whole application
  generalHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  formDataHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'formData'
    })
  };

  questionsSchemasArray$: any = this.http
    .get<ModelsInformationObject[]>(
      this.backendUri + '/bootSchemaFactory/questionsSchemas'
    )
    .pipe(tap());
  answersSchemasArray$: any = this.http.get<ModelsInformationObject[]>(
    this.backendUri + '/bootSchemaFactory/answersSchemas'
  );
  dbSchemasArray$: Observable<DbSchemasObject> = this.http.get<DbSchemasObject>(
    this.backendUri + '/getDatabaseSchemas'
  );
  constructor(private http: HttpClient) {}

  getQuestionProperties(
    schemaName?: string,
    schemaFields?: string[]
  ): Observable<QuestionsProperties[]> {
    return this.http
      .post(
        this.backendUri + '/getProperties/getQuestionsDocs',
        { schemaName, schemaFields },
        this.generalHttpOptions
      )
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
        })
      );
  }
}
