import { GeneralServiceService } from './../general-service.service';
import { UsersPageService } from './users-page.service';
import { Component, OnInit } from '@angular/core';
import { ItemNumber } from '../Models//itemNumberInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  paginationControlsForm: FormGroup;
  itemNumbers: ItemNumber[] = [
    { viewValue: 10 },
    { viewValue: 25 },
    { viewValue: 50 },
    { viewValue: 100 }
  ];
  questionsSchemasArray$: any = this.genService.questionsSchemasArray$.pipe(
    catchError(err => {
      console.log(err);
      return of(null);
    })
  );
  answersSchemasArray$: any = this.genService.answersSchemasArray$.pipe(
    catchError(err => {
      console.log(err);
      return of(null);
    })
  );
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersPageService,
    private genService: GeneralServiceService
  ) {}

  ngOnInit() {
    this.setupPagination();
  }
  getData() {
    this.questionsSchemasArray$.subscribe(result => {
      console.log(result);
    });
    this.answersSchemasArray$.subscribe(result => {
      console.log(result);
    });
  }
  setupPagination() {
    this.paginationControlsForm = this.formBuilder.group({
      ItemNumbers: ['', [Validators.required]]
    });
  }
}
