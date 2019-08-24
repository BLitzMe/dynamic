import { DatePipe } from '@angular/common';
import { QuestionDoc, SingleQuestion } from './../Models/questionDocIf';
import { GeneralServiceService } from './../general-service.service';
import { UsersPageService } from './users-page.service';
import { Component, OnInit } from '@angular/core';
import { ItemNumber } from '../Models//itemNumberInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, of, from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [DatePipe]
})
export class UsersPageComponent implements OnInit {
  questionnaires$: Observable<QuestionDoc[]>;
  currentQuestionnaire$: Observable<QuestionDoc>;
  questionnaireSelected = false;
  paginationControlsForm: FormGroup;
  currentQuestionIndex = 0;
  myDate = new Date();
  formattedDate: string;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersPageService,
    private genService: GeneralServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.formattedDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  itemNumbers: ItemNumber[] = [
    { viewValue: 10 },
    { viewValue: 25 },
    { viewValue: 50 },
    { viewValue: 100 }
  ];
  ngOnInit() {
    this.subscribeToApi();
    /*  this.usersService.userInfoEdited = true; */
  }
  selectQuestionnaire(questionnaire) {
    if (this.usersService.userInfoEdited === false) {
      this.snackBar.open('Please enter your personal information first', '', {
        duration: 1500
      });
      this.router.navigate(['/userDataInput']);
    } else {
      this.currentQuestionnaire$ = of(questionnaire);
      this.questionnaireSelected = true;
    }
  }
  subscribeToApi() {
    this.questionnaires$ = this.usersService.getQuestionDocs$();
    this.usersService.getQuestionDocs$().subscribe(message => {
      console.log(typeof message);
    });
  }
  increaseQuestionIndex(event, questionsLength) {
    console.log(questionsLength);
    if (this.currentQuestionIndex === questionsLength - 1) {
      this.snackBar.open(
        'This is the last question. Consider Sending Data',
        '',
        {
          duration: 1000
        }
      );
    } else {
      this.currentQuestionIndex++;
    }

    console.log(this.currentQuestionIndex);
  }
  decreaseQuestionIndex(event, questions) {
    if (
      this.currentQuestionIndex >= 0 &&
      this.usersService.checkAnswerDocDuplicates(
        questions[this.currentQuestionIndex - 1].questionKey
      ) === true
    ) {
      this.snackBar.open(
        'data for previous question already saved. Please go to next question'
      );
    } else if (this.currentQuestionIndex === 0) {
      this.snackBar.open('This is the first Question', '', {
        duration: 1000
      });
    } else {
      this.currentQuestionIndex--;
    }

    console.log(this.currentQuestionIndex);
  }
  sendData() {
    console.log(this.usersService.answerDoc);
    this.usersService.answerDoc.date = this.formattedDate;
    this.router.navigate(['./usersPage']);
    console.log(this.usersService.answerDoc);
  }
}
