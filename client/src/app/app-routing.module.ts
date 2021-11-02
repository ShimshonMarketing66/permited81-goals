import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  {
    path: "",
    redirectTo:"goal",
    pathMatch:"full"
  },
  {
    path: "goal",
    loadChildren: () => import('./goal/goal.module').then(m => m.GoalModule),
    canActivate:[LoggedInGuard]
  },
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
