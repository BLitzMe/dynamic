import { FieldUpdateIF } from '../../Models/fieldValueUpdateIF';
import { AdminsPageService } from '../admins-page.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmitterVisitorContext } from '@angular/compiler';

import {} from 'events';

@Component({
  selector: 'app-question-doc',
  templateUrl: './question-doc.component.html',
  styleUrls: ['./question-doc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionDocComponent implements OnInit {
  @Input() doc: any;
  // trigger update
  updateView = false;
  @Output() updateViewEmitter = new EventEmitter();
  schemaEditData: FormGroup;
  newQuestionDocData: FormGroup;
  objectKeys = Object.keys;
  selectedIdx: any;
  // template booleans
  newQuesInput: any = false;
  schemaNameInput: any = false;
  questionKeyInput: any = false;

  newQuestionInput: any = false;
  // enable new schema Input

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminsPageService
  ) {
    /*    this.prepareAndValidateNewSchema();
    this.prepareAndValidateNewField(); */
    this.prepareNewQuestionDoc();
  }

  ngOnInit() {
    console.log(this.newQuestionInput);
    /* this.tester(); */
  }
  prepareNewQuestionDoc() {
    this.schemaEditData = this.formBuilder.group({
      schemaName: ['']
    });
  }
  closeNewQuesInput(signal) {
    if (signal === true) {
      this.newQuesInput = false;
    }
  }
  editSchemaName(schemaName) {
    const dataToSend = new FormData();
    dataToSend.append('currentSchemaName', schemaName);
    dataToSend.append(
      'newSchemaName',
      this.schemaEditData.get('schemaName').value
    );
    console.log(dataToSend);
    this.adminService.updateSchemaName$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
  sendViewUpdateSignal(signal?: any) {
    this.updateView = true;
    this.updateViewEmitter.emit(this.updateView);
  }
}
