import * as SchemaArrayActions from './redux/actions/schemasarrayactions';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../app/redux/state';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  backendUri = 'http://localhost:4000';
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  globalModelsSave() {
    this.http.get(this.backendUri + '/bootSchemaFactory').subscribe(data => {
      this.store.dispatch(new SchemaArrayActions.SaveNewArray(data));
    });
  }
}
