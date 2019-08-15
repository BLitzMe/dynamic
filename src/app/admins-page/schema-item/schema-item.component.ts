import { FieldUpdateIF } from './../../Models/fieldValueUpdateIF';
import { AdminsPageService } from './../admins-page.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmitterVisitorContext } from '@angular/compiler';

import {} from 'events';

@Component({
  selector: 'app-schema-item',
  templateUrl: './schema-item.component.html',
  styleUrls: ['./schema-item.component.scss']
})
export class SchemaItemComponent implements OnInit {
  @Input() schema: any;
  //trigger update
  updateView = false;
  @Output() updateViewEmitter = new EventEmitter();
  schemaEditData: FormGroup;
  newFieldData: FormGroup;
  objectKeys = Object.keys;
  selectedIdx: any;
  // template booleans
  questionInput: any = false;
  schemaNameInput: any = false;
  questionKeyInput: any = false;
  newFieldInput: any = false;

  // enable new schema Input

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminsPageService
  ) {
    this.prepareAndValidateNewSchema();
    this.prepareAndValidateNewField();
  }

  ngOnInit() {
    this.tester();
  }
  tester() {
    console.log(this.questionKeyInput);
  }
  prepareAndValidateNewSchema() {
    this.schemaEditData = this.formBuilder.group({
      question: [''],
      schemaName: [''],
      questionKey: ['']
    });
  }

  selectItem(index): void {
    this.selectedIdx = index;
    console.log(this.selectedIdx);
  }
  // all schema functions
  editSchemaName(schemaName) {
    const dataToSend = new FormData();
    dataToSend.append('schemaName', schemaName);
    dataToSend.append(
      'newSchemaName',
      this.schemaEditData.get('schemaName').value
    );
    this.adminService.editSchemaName$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendUpdateViewSignal();
    });
  }
  editQuestionField(schemaName, fieldToUpdate, questionValue, schemaFields) {
    const dataToSend = new FormData();
    dataToSend.append('schemaName', schemaName);
    dataToSend.append('newField', this.schemaEditData.get('questionKey').value);
    dataToSend.append('questionValue', questionValue);
    for (const field of schemaFields) {
      dataToSend.append('schemaFields[]', field);
    }
    dataToSend.append('fieldToRemove', fieldToUpdate);
    this.adminService.editQuestionField$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendUpdateViewSignal();
    });
  }
  // new field functions
  prepareAndValidateNewField() {
    this.newFieldData = this.formBuilder.group({
      newFieldValue: ['']
    });
  }
  sendNewFieldData(schemaName, schemaFields) {
    const dataToSend = new FormData();
    dataToSend.append('schemaName', schemaName);
    dataToSend.append('newField', this.newFieldData.get('newFieldValue').value);
    dataToSend.append('questionValue', '');
    dataToSend.append('fieldToRemove', '');
    for (const field of schemaFields) {
      dataToSend.append('schemaFields[]', field);
    }
    this.adminService.addNewField$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendUpdateViewSignal();
    });
  }
  addProperty(key, schemaName, schemaFields) {
    const dataToSend = new FormData();
    dataToSend.append('collectionName', schemaName);
    for (const field of schemaFields) {
      dataToSend.append('schemaFields[]', field);
    }

    dataToSend.append('keyOne', key);
    dataToSend.append('valueOne', this.schemaEditData.get('question').value);
    this.adminService.addProperty$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendUpdateViewSignal();
    });
  }

  deleteField(schemaName, schemaFields, fieldToRemove) {
    console.log('bullshit');
    const dataToSend = new FormData();
    dataToSend.append('fieldToRemove', fieldToRemove);
    for (const field of schemaFields) {
      dataToSend.append('schemaFields[]', field);
    }
    dataToSend.append('schemaName', schemaName);
    this.adminService.deleteField$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendUpdateViewSignal();
    });
  }

  sendUpdateViewSignal() {
    this.updateView = true;
    this.updateViewEmitter.emit(this.updateView);
  }
  clickMe() {}
}
