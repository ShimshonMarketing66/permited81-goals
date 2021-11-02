import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: "AIzaSyCEzNzFSNA058Ctughg-oqZv5Pal4oG0Ng",
      authDomain: "goals-ca7dc.firebaseapp.com",
      projectId: "goals-ca7dc",
      storageBucket: "goals-ca7dc.appspot.com",
      messagingSenderId: "310966308984",
      appId: "1:310966308984:web:19ea256477bb23b73d1d8d"
  },
  () => 'goals-ca7dc',
 {
  //  enableFirestoreSync: true, // enable/disable autosync users with firestore
   toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
   toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
   authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
  //  authGuardLoggedInURL: '/goal', // url for authenticated users - to use in combination with canActivate feature on a route
   passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
   passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
   // Same as password but for the name
   nameMaxLength: 50,
   nameMinLength: 2,
   // If set, sign-in/up form is not available until email has been verified.
   // Plus protected routes are still protected even though user is connected.
   guardProtectedRoutesUntilEmailIsVerified: false,
   enableEmailVerification: false, // default: true
   useRawUserCredential: true, // If set to true outputs the UserCredential object instead of firebase.User after login and signup - Default: false
  
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
