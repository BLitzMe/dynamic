import { UsersPageService } from './../../users-page/users-page.service';
import { AnswersDoc } from './../../Models/ansersDocModel';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { RecordModalComponent } from './record-modal/record-modal.component';
@Component({
  selector: 'app-records-tab',
  templateUrl: './records-tab.component.html',
  styleUrls: ['./records-tab.component.scss']
})
export class RecordsTabComponent implements OnInit {
  modalData: AnswersDoc;
  answersDocs$: Observable<AnswersDoc[]>;
  showModal = false;
  constructor(
    private userService: UsersPageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAnswersDocs();
    this.answersDocs$.subscribe(message => {
      console.log(message);
    });
  }
  openDialog(myData) {
    console.log(myData);
    const dialogRef = this.dialog.open(RecordModalComponent, {
      width: '700px',
      height: '600px',
      data: myData
    });
  }
  getAnswersDocs() {
    this.answersDocs$ = this.userService.getAllAnswerDocs$();
  }
  setModalData() {}
}
