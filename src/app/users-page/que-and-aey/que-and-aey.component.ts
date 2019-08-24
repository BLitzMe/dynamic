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
  checked: string;
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
  }
  openPreviousQuestion() {
    this.previousQuestion = true;
    this.previousQuestionEmitter.emit(this.previousQuestion);
  }
  setChecked(value) {
    this.checked = value;
  }
  pushAnswerObject() {
    if (
      this.answerForm.get('textAnswer').value === undefined &&
      this.checked === undefined
    ) {
      this.snackBar.open(
        'please select and option or enter an answer in the field'
      );
    } else if (this.checked === undefined) {
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
          this.checked
        )
      );
      console.log(this.userService.answerDoc);
    }
  }
}
