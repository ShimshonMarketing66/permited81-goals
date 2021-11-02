import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgxAuthFirebaseUIModule
  ]
})
export class LoginModule { }
