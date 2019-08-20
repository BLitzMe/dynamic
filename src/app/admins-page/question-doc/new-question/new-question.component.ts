import { AdminsPageService } from './../../admins-page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  newQuestionData: FormGroup;
  updateView = false;
  @Input() doc;
  @Output() updateViewEmitter = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminsPageService
  ) {}
  @Output() closeNewQuesInputEmitter = new EventEmitter();
  closeNewQuesInput = false;
  ngOnInit() {
    this.prepareNewQuestionForm();
    console.log(this.doc);
  }

  prepareNewQuestionForm() {
    this.newQuestionData = this.formBuilder.group({
      newQuestionKey: ['', Validators.required],
      newQuestionValue: [''],
      newQuestionOptions: ['']
    });
  }
  sendNewQuestionData() {
    console.log('beep beep');
    const dataToSend = new FormData();
    dataToSend.append('schemaName', this.doc.schemaName);
    dataToSend.append(
      'newQuestionKey',
      this.newQuestionData.get('newQuestionKey').value
    );
    dataToSend.append(
      'newQuestionValue',
      this.newQuestionData.get('newQuestionValue').value
    );
    const optionsString = this.newQuestionData.get('newQuestionOptions').value;
    const optionsArray = optionsString.split(',');
    if (optionsArray.length === 1) {
      optionsArray.pop();
    }
    for (const option of optionsArray) {
      dataToSend.append('newQuestionOptions[]', option);
    }
    this.adminService.sendNewQuestionData$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
 
  sendCloseNewQuesInputSignal() {
    this.closeNewQuesInput = true;
    this.closeNewQuesInputEmitter.emit(this.closeNewQuesInput);
  }
  sendViewUpdateSignal() {
    this.updateView = true;
    this.updateViewEmitter.emit(this.updateView);
  }
}
