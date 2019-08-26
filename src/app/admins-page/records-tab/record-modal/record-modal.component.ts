import { Observable } from 'rxjs';
import { UsersPageService } from './../../../users-page/users-page.service';
import { AnswersDoc } from './../../../Models/ansersDocModel';
import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss']
})
export class RecordModalComponent implements OnInit {
  jGenned = false;
  gennedJSON$: Observable<JSON>;
  constructor(
    public dialogRef: MatDialogRef<RecordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnswersDoc,
    private userService: UsersPageService
  ) {}

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  getJSONObj(date) {
    console.log(date);
    this.jGenned = true;
    const dataToSend = new FormData();
    dataToSend.append('date', date);
    this.gennedJSON$ = this.userService.getJsonObj$(dataToSend);
    this.userService.getJsonObj$(dataToSend).subscribe(message => {
      console.log(message);
    });
  }
}
