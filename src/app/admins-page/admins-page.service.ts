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
  // collect answers
  processQuestionsPropertiesArray$(): any {
    return this.getQuestionsProperties$().pipe(
      map(result => {
        console.log(result);
        for (const ele of result) {
          console.log(ele);
          delete ele._id;
          delete ele.__v;
        }
        console.log(result);
        return result;
      })
    );
  }
  processSchemaAndProperties(): any {
    // collect question Properties
    const result$ = combineLatest([
      this.dbSchemasArray$,
      this.processQuestionsPropertiesArray$()
    ]).pipe();

    /* merge(
      this.dbSchemasArray$.pipe(),
      this.processQuestionsPropertiesArray$().pipe()
    ); */
    return result$;
  }
  assignAnswers(schemasArray, myQuesArray) {
    const quesArray = Object.assign([], myQuesArray);
    console.log(quesArray);
    const tempArray = [];
    // Only one key has to exist in the quesArray
    for (let schema = 0; schema <= schemasArray.length - 1; schema++) {
      // if ther is one property on the quesitons object that matches the
      // schema fields
      if (quesArray[0].hasOwnProperty(schemasArray[schema].schemaFields[0])) {
        let tempEle = {};
        tempEle = Object.assign(
          {},
          {
            ...schemasArray[schema],
            quesAnsObj: quesArray[0]
          }
        );
        tempArray.push(tempEle);
        quesArray = _.pull(quesArray, quesArray[0]);
        schema = 0;
        // make a new object on the schema object that contains the schema fields
        // simply insert the questions object onto the schema object
      }
    }
    return tempArray;
  }
}
