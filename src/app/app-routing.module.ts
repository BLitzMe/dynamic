import { UserDataComponent } from './users-page/user-data/user-data.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    // temporary route
    path: 'landingPage',
    component: LandingPageComponent
  },
  {
    path: 'usersPage',
    component: UsersPageComponent
  },
  {
    path: 'adminsPage',
    component: AdminsPageComponent
  },
  {
    path: 'userDataInput',
    component: UserDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
