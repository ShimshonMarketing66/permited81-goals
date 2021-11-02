import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthProcessService, AuthProvider} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  providers = AuthProvider;
  constructor(
    public authService:AuthProcessService,
    public router:Router) {
      var observable = this.authService.onSuccessEmitter.subscribe(()=>{
      console.log("log in");
      this.router.navigateByUrl('goal')
      observable.unsubscribe()
    })
   }

  ngOnInit(): void {
  }

}
