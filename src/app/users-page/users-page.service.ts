import { GeneralServiceService } from './../general-service.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelsInformationObject } from '../Models/modelsInformationObjectModel';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class UsersPageService {
  receivedSchemasArray: Observable<Array<ModelsInformationObject>>;
  backendUri = this.genService.backendUri;
  schemasArray: any;
  
  constructor(
    private http: HttpClient,
    private genService: GeneralServiceService
  ) {
    /*  this.globalModelsArraySave(); */
  }
  // * called currently on the components on init

  // * called manullay on a button push currently
  modelsArrayCall() {
    console.log('models array on route call \n' + this.schemasArray);
    return this.http.post(
      this.backendUri + '/modelsFactoryRoute/pullModelsArray',
      { monkey: this.schemasArray },
      this.genService.generalHttpOptions
    );
  }

  // !! need to send schemaName and schema data, also array of
  // !! field value update objects to update
}
