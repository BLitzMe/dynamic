import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ItemNumber } from '../Models//itemNumberInterface';
import { GeneralServiceService } from './../general-service.service';
import { QuestionDoc } from './../Models/questionDocIf';
import { UsersPageService } from './users-page.service';

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

  formattedDate: string;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersPageService,
    private genService: GeneralServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    /*   this.formattedDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
     */
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
      this.currentQuestionIndex > 0 &&
      this.usersService.checkAnswerDocDuplicates(
        questions[this.currentQuestionIndex - 1].questionKey
      ) === true
    ) {
      this.snackBar.open(
        'data for previous question already saved. Please go to next question',
        '',
        {
          duration: 1500
        }
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
    this.usersService.answerDoc.date = new Date();
    const dataToSend = new FormData();
    /*  dataToSend.append('answersDoc', this.usersService.answerDoc.toString());
     */

    this.usersService
      .sendAnswersDoc$(this.usersService.answerDoc)
      .subscribe(message => {
        console.log(message);
        this.snackBar.open('Data saved successfully', '', { duration: 1500 });
        this.questionnaireSelected = false;
      });
  }
}
