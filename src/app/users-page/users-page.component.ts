import { Component, OnInit } from '@angular/core';
import { ItemNumber } from '../Models//itemNumberInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setupPagination();
  }
  setupPagination() {
    this.paginationControlsForm = this.formBuilder.group({
      ItemNumbers: ['', [Validators.required]]
    });
  }
}
