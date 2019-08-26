import { GeneralServiceService } from './general-service.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersPageComponent } from './users-page/users-page.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { QuestionDocComponent } from './admins-page/question-doc/question-doc.component';
import { QuestionComponent } from './admins-page/question-doc/question/question.component';
import { NewQuestionComponent } from './admins-page/question-doc/new-question/new-question.component';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { NewQuestionsDocComponent } from './admins-page/new-questions-doc/new-questions-doc.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QueAndAeyComponent } from './users-page/que-and-aey/que-and-aey.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDataComponent } from './users-page/user-data/user-data.component';
import { DatePipe, CommonModule } from '@angular/common';
import { RecordsTabComponent } from './admins-page/records-tab/records-tab.component';
import { RecordModalComponent } from './admins-page/records-tab/record-modal/record-modal.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { answersSchemasArrayReducer } from './redux/reducers/answersschemasarrayreducer';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UsersPageComponent,
    AdminsPageComponent,
    QuestionDocComponent,
    QuestionComponent,
    NewQuestionComponent,
    NewQuestionsDocComponent,
    QueAndAeyComponent,
    UserDataComponent,
    RecordsTabComponent,
    RecordModalComponent
  ],
  imports: [
    MatButtonToggleModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatListModule,
    MatRadioModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent],
  entryComponents: [RecordModalComponent]
})
export class AppModule {}
