import { UserInfo } from './../../Models/ansersDocModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersPageService } from './../users-page.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  userInfoForm: FormGroup;
  userInfo: UserInfo = new UserInfo();
  constructor(
    private userService: UsersPageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.prepareUserDataForm();
  }
  prepareUserDataForm() {
    this.userInfoForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Geburtsname: [''],
      Vorname: ['', Validators.required],
      Postleitzahl: ['', Validators.required],
      Stadt: ['', Validators.required],
      Strasse: ['', Validators.required],
      Land: ['', Validators.required],
      Provinz: ['', Validators.required]
    });
  }
  saveData() {
    this.userInfo.Name = this.userInfoForm.get('Name').value;
    this.userInfo.Geburtsname = this.userInfoForm.get('Geburtsname').value;
    this.userInfo.Vorname = this.userInfoForm.get('Vorname').value;
    this.userInfo.Postleitzahl = this.userInfoForm.get('Postleitzahl').value;
    this.userInfo.Stadt = this.userInfoForm.get('Stadt').value;
    this.userInfo.Strasse = this.userInfoForm.get('Strasse').value;
    this.userInfo.Land = this.userInfoForm.get('Land').value;
    this.userInfo.Provinz = this.userInfoForm.get('Provinz').value;
    this.userService.saveUserData(this.userInfo);
    this.snackBar.open(
      'User Data entered. Please select your questionnaire',
      '',
      {
        duration: 1500
      }
    );
    this.router.navigate(['/usersPage']);
  }
  cancelAndRedirect() {
    this.snackBar.open(
      'User Data not entered. Redirecting to Questionnaire page',
      '',
      {
        duration: 1500
      }
    );
    this.router.navigate(['/usersPage']);
  }
}
