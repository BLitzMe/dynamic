import { QuestionDoc } from './../Models/questionDocIf';
import { QuestionsProperties } from './../Models/getPropertiesIF';
import { AdminsPageService } from './admins-page.service';
import { GeneralServiceService } from './../general-service.service';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  Form
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss'],
  providers: [NgbDropdownConfig]
})
export class AdminsPageComponent implements OnInit {
  questionsDocs$: Observable<QuestionDoc[]>;
  lattice: Observable<QuestionDoc[]>;
  questionsPropertiesArray: any;
  schemas$: Observable<QuestionsProperties[]>;
  newSchemaInput = false;
  newQuestionsDocInput: any = false;
  schemaEditData: FormGroup;

  schemasTab = true;

  constructor(
    private genService: GeneralServiceService,
    private adminService: AdminsPageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subscribeToApi();
  }
  deleteQuesDoc(schemaName) {
    const dataToSend = new FormData();
    dataToSend.append('schemaName', schemaName);
    this.adminService.deleteQuesDoc$(dataToSend).subscribe(message => {
      console.log(message);
      this.subscribeToApi();
    });
  }
  closeNewQuesDocInput(signal) {
    console.log(
      'emitter for new ques doc close works' +
        signal +
        this.newQuestionsDocInput
    );
    if (signal === true) {
      this.newQuestionsDocInput = false;
    }
  }
  subscribeToApi(signal?: any) {
    this.questionsDocs$ = this.adminService.getQuestionDocs$();
  }
}
