import { QuestionsProperties } from './../Models/getPropertiesIF';
import { AdminsPageService } from './admins-page.service';

import { GeneralServiceService } from './../general-service.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  DoCheck,
  IterableDiffer,
  IterableDiffers,
  ViewChild
} from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  Form
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss'],
  providers: [NgbDropdownConfig]
})
export class AdminsPageComponent implements OnInit {
  questionsPropertiesArray: any;
  schemas$: Observable<QuestionsProperties[]>;
  newSchemaInput = false;
  newSchemaData: FormGroup;
  differ: IterableDiffer<any>;
  // form properties

  constructor(
    private genService: GeneralServiceService,
    private adminService: AdminsPageService,
    private formBuilder: FormBuilder,
    private differs: IterableDiffers,
    private ref: ChangeDetectorRef
  ) {
    this.prepareAndValidateNewSchemaForm();
    this.differ = differs.find([]).create(null);
    /*  this.adminService.processQuestionsPropertiesArray$().subscribe(
    });
    this.adminService.dbSchemasArray$.subscribe(result => {
    }); */
  }

  ngOnInit() {
    this.schemas$ = this.adminService.getQuestionsProperties$();
  }
  /*  ngDoCheck(): void {
    const changes = this.differ.diff(this.schemas$);
  } */
  prepareAndValidateNewSchemaForm() {
    this.newSchemaData = this.formBuilder.group({
      schemaName: ['', Validators.required],
      schemaFields: ['', Validators.required]
    });
  }

  sendNewSchemaData() {
    const dataToSend = new FormData();
    const fieldsValues: any = this.newSchemaData.get('schemaFields').value;
    const fieldsArray = fieldsValues.split(',');
    console.log(this.newSchemaData.get('schemaName').value);
    /* const dataToSend = {
      schemaName: this.newSchemaData.get('schemaName').value,
      schemaFields: fieldsArray,
      documentId: ''
    }; */
    /*
     */
    dataToSend.append('schemaName', this.newSchemaData.get('schemaName').value);
    for (const data of fieldsArray) {
      dataToSend.append('schemaFields[]', data);
    }

    dataToSend.append('documentId', '');
    this.adminService.createNewSchema$(dataToSend).subscribe(serverReply => {
      console.log(
        'newSchema Object sent to server. Server Response: \n' + serverReply
      );
      this.updateDbSchemasObs();
    });
  }
  deleteSchema(schemaName) {
    console.log(schemaName);
    const schemaToDelete = {
      schemaName
    };
    this.adminService.deleteSchema$(schemaToDelete).subscribe(message => {
      console.log(message);
      this.updateDbSchemasObs();
    });
  }
  updateDbSchemasObs(emitter?: any) {
    this.schemas$ = this.adminService.getQuestionsProperties$();
  }

  // * use below later to input an array of fields
  /*  initFields() {
    return this.formBuilder.group({
      field: ['', Validators.required]
    });
  }
  removeField(index: number) {
    const control = this.newSchemaData.controls['schemaFields'] as FormArray;
    control.removeAt(index);
  } */
}
