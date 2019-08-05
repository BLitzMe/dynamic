import { GeneralServiceService } from './general-service.service';
import { ModelsInformationObject } from './Models/modelsInformationObjectModel';
// import { AnswersSchemasArrayState } from './redux/states/answersschemasarraystate';
import { Component, OnInit } from '@angular/core';

import { SchemasArrayState } from './redux/states/questionsschemasarraystate';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  receivedQuestionsSchemasArray: Observable<
    Array<Array<ModelsInformationObject>>
  >;
  
  receivedAnswersSchemasArray: Observable<Array<ModelsInformationObject>>;
  title = 'dynamicModelsTry';
  constructor(private schemasService: GeneralServiceService) {}
  ngOnInit() {
    
  }
}
