import { QuestionsProperties } from './../Models/getPropertiesIF';
import { AdminsPageService } from './admins-page.service';
import { DbSchemaObject, DbSchemasObject } from './../Models/dbSchemasModel';
import { ModelsInformationObject } from './../Models/modelsInformationObjectModel';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { GeneralServiceService } from './../general-service.service';
import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss']
})
export class AdminsPageComponent implements OnInit {
  questionsPropertiesArray: QuestionsProperties[] = [];
  schemas: DbSchemasObject;
  constructor(
    private genService: GeneralServiceService,
    private adminService: AdminsPageService /* ,
    private assAns: assignAnswers */
  ) {
    this.adminService.processSchemaAndProperties().subscribe(result => {
      this.questionsPropertiesArray = result[1];
      this.schemas = result[0];
    });
    /*  this.adminService.processQuestionsPropertiesArray$().subscribe(
    });
    this.adminService.dbSchemasArray$.subscribe(result => {
    }); */
  }

  ngOnInit() {}

  printArrays() {
    console.log(this.schemas);
    console.log(this.questionsPropertiesArray);
    const array = this.adminService.assignAnswers(
      this.schemas,
      this.questionsPropertiesArray
    );
    console.log(array);
  }
}
