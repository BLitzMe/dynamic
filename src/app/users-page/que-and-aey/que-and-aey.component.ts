import { AnswerObj } from './../../Models/ansersDocModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersPageService } from '../users-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-que-and-aey',
  templateUrl: './que-and-aey.component.html',
  styleUrls: ['./que-and-aey.component.scss']
})
export class QueAndAeyComponent implements OnInit {
  @Input() question;
  answerValue = '';
  answerKey: number;
  answerForm: FormGroup;
  nextQuestion = false;
  previousQuestion = false;

  @Output() previousQuestionEmitter = new EventEmitter();
  @Output() nextQuestionEmitter = new EventEmitter();
  constructor(
    private userService: UsersPageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.prepareAnswerForm();
  }

  prepareAnswerForm() {
    this.answerForm = this.formBuilder.group({
      textAnswer: ['']
    });
  }
  openNextQuestion() {
    this.pushAnswerObject();
    this.nextQuestion = true;
    this.nextQuestionEmitter.emit(this.nextQuestion);
    console.log(this.userService.answerDoc);
    this.answerValue = '';
  }
  openPreviousQuestion() {
    this.previousQuestion = true;
    this.previousQuestionEmitter.emit(this.previousQuestion);
  }
  setAnswerData(answerValue, answerKey) {
    console.log(answerValue, answerKey);
    this.answerValue = answerValue;
    this.answerKey = answerKey;
  }
  pushAnswerObject() {
    if (
      this.answerForm.get('textAnswer').value === undefined &&
      this.answerValue === undefined
    ) {
      this.snackBar.open(
        'please select and option or enter an answer in the field'
      );
    } else if (this.answerValue === '') {
      this.userService.answerDoc.answerObj.push(
        new AnswerObj(
          this.question.questionKey,
          this.question.questionValue,
          this.answerForm.get('textAnswer').value
        )
      );
      console.log(this.userService.answerDoc);
    } else {
      this.userService.answerDoc.answerObj.push(
        new AnswerObj(
          this.question.questionKey,
          this.question.questionValue,
          this.answerValue,
          this.answerKey
        )
      );
      console.log(this.userService.answerDoc);
    }
  }
}
