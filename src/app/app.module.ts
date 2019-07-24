import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersPageComponent } from './users-page/users-page.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { modelsArrayReducer } from '../app/redux/reducers/schemaarrayreducers';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UsersPageComponent,
    AdminsPageComponent
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
    StoreModule.forRoot({
      modelsArrayReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
