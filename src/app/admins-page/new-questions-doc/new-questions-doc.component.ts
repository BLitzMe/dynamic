import { AdminsPageService } from './../admins-page.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-questions-doc',
  templateUrl: './new-questions-doc.component.html',
  styleUrls: ['./new-questions-doc.component.scss']
})
export class NewQuestionsDocComponent implements OnInit {
  newQuestionsDocData: FormGroup;
  closeNewDocElement: any = false;
  newQuesInput = false;
  udpateView = false;
  @Output() updateViewSignal = new EventEmitter();
  @Output() closeNewDocElementEmitter = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminsPageService
  ) {}

  ngOnInit() {
    this.prepareNewQuestionDocForm();
  }
  prepareNewQuestionDocForm() {
    this.newQuestionsDocData = this.formBuilder.group({
      newSchemaName: [''],
      schemaFields: ['']
    });
  }
  sendNewQuesDoc() {
    const dataToSend = new FormData();
    dataToSend.append(
      'schemaName',
      this.newQuestionsDocData.get('newSchemaName').value
    );
    dataToSend.append(
      'schemaFields',
      this.newQuestionsDocData.get('schemaFields').value
    );
    dataToSend.append('documentId', '');
    this.adminService.sendNewQuestionsDoc$(dataToSend).subscribe(message => {
      console.log(message);
      this.sendViewUpdateSignal();
    });
  }
  sendViewUpdateSignal() {
    this.udpateView = true;
    this.updateViewSignal.emit(this.udpateView);
  }
  sendCloseDocElementSignal() {
    this.closeNewDocElement = true;
    this.closeNewDocElementEmitter.emit(this.closeNewDocElement);
  }
}
