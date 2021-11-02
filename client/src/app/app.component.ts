import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthProcessService,
    private router: Router
  ) {

  }



}
