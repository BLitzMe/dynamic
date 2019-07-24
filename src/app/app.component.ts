import { PreparedModel } from './Models/modelsArrayModel';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app/redux/state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  receivedModelsArray: Observable<Array<PreparedModel>>;
  title = 'dynamicModelsTry';
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.receivedModelsArray = this.store.select('modelsArrayReducer');
  }
}
