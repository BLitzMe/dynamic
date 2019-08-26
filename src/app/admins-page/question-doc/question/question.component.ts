import { AdminsPageService } from './../../admins-page.service';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() doc: any;
  questionKeyInput: false;
  questionValueInput: false;
  questionOptionsInput: false;
  newQuestionOptionsInput: false;
  updateView = false;
  @Output() updateViewEmitter = new EventEmitter();
  additionalQuestionOptionInput: false;
  editQuestionData: FormGroup;
  index: number;
  constructor(
    private formbuilder: FormBuilder,
    private adminService: AdminsPageService
  ) {
    this.prepareQuestionForm();
  }

  ngOnInit() {
    console.log(this.question);
  }

  prepareQuestionForm() {
    this.editQuestionData = this.formbuilder.group({
      questionKey: [''],
      questionValue: [''],
      questionOption: [''],
      additionalQuestionOption: ['']
    });
  }
  editQuestionKey(keyToRemove) {
    const dataToSend = new FormData();
    dataToSend.append('keyToRemove', keyToRemove);
    dataToSend.append('newKey', this.editQuestionData.get('questionKey').value);
    this.adminService.updateQuestionKey$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
  editQuestionValue(questionKey) {
    console.log(questionKey);
    const dataToSend = new FormData();
    dataToSend.append('questionKey', questionKey);
    dataToSend.append(
      'questionValue',
      this.editQuestionData.get('questionValue').value
    );
    this.adminService.updateQuestionValue$(dataToSend).subscribe(message => {
      console.log(message);
    });
    this.sendViewUpdateSignal();
  }

  addQuestionOptions(questionKey) {
    const dataToSend = new FormData();
    const optionsString = this.editQuestionData.get('additionalQuestionOption')
      .value;
    const optionsArray = optionsString.split(',');
    for (const option of optionsArray) {
      dataToSend.append('newOptions[]', option);
    }
    dataToSend.append('questionKey', questionKey);
    this.adminService
      .additionalQuestionOptions$(dataToSend)
      .subscribe(message => {
        console.log(message);
        this.sendViewUpdateSignal();
      });
  }
  updateAnOption(questionKey, optionToRemove) {
    const dataToSend = new FormData();
    dataToSend.append('questionKey', questionKey);
    dataToSend.append(
      'newOptions[]',
      this.editQuestionData.get('questionOption').value
    );
    dataToSend.append('optionsToDelete[]', optionToRemove);
    this.adminService.updateAnOption$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
  deleteAnOption(questionKey, optionToRemove) {
    const dataToSend = new FormData();
    dataToSend.append('optionsToDelete[]', optionToRemove);
    dataToSend.append('questionKey', questionKey);
    this.adminService.deleteAnOption$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
  deleteQuestion() {
    const dataToSend = new FormData();
    dataToSend.append('keyToRemove', this.question.questionKey);
    dataToSend.append('schemaName', this.doc.schemaName);
    this.adminService.deleteQuestion$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
  setIndex(index) {
    this.index = index;
  }
  sendViewUpdateSignal() {
    this.updateView = true;
    this.updateViewEmitter.emit(this.updateView);
  }
}
