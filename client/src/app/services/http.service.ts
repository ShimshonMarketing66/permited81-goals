/**
 * use this httpservice to add the jwt for all the requests 
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Injectable({
  providedIn: 'root'
})
export class HttpService{
  
  idToken:string
  constructor(
    private http:HttpClient,
    public authService:AuthProcessService,
    ) { 
      this.authService.afa.onIdTokenChanged(async user=>{
       this.idToken = await user.getIdToken(true);
      })
    }

  async get(url,params?){
    if (!params) {
      params = {};
    }
    var idToken = await this.getIdToken();
    params.idToken = idToken;
    return this.http.get(url,{
      params:params
    }).toPromise() as any;
  }

  async post(url,params){
    var idToken = await this.getIdToken();
    params.idToken = idToken;
    return this.http.post(url,params).toPromise();
  }

  async put(url,params){
    var idToken = await this.getIdToken()
    params.idToken = idToken;
    return this.http.put(url,params).toPromise();
  }


  private getIdToken():Promise<string> {
    if (this.idToken) {
      return Promise.resolve(this.idToken)
    }
    return new Promise((resolve) => {
     this.authService.afa.idToken.subscribe((id)=>{
       resolve(id)
     })
    })
  }
}
