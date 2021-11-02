import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:UserModel = undefined!
  constructor(  
    ) {
    this.user = {
      _id:"4d5sa45ds4"
    }
  }
}
