import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { GoalModel } from '../models/goal';
import { Step } from '../models/step';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  
 
 
  domain = "http://localhost:3000";
  idToken: string;
  constructor(
    private http:HttpService
    ) { 
    }

  getGoal():Promise<GoalModel[]>{
    return this.http.get(`${this.domain}/goal`)  as Promise<GoalModel[]>
  }

  addGoal(_goal:{
    name:string,
    description:string,
    dueDate:Date,
    user_id?:string
  }) {
    return this.http.post(`${this.domain}/goal`,{
      goal:_goal
    })as unknown as Promise<GoalModel[]>
  }

  addStep(goal_id:string,step:{
    name:string,
    description:string,
    dueDate:Date
  }):Promise<GoalModel>{
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.domain}/goal/step`,{
        goal_id:goal_id,
        step:step
      })
      .then(d=>{
        resolve(d as GoalModel)
      })
      .catch(err=>{
        reject(err)
      })
    })
  
  }


  updateGoal(goal: GoalModel) {
    return new Promise((resolve,reject)=>{
      this.http.put(`${this.domain}/goal`,{
        goal:goal
      })
      .then(d=>{
        console.log("d",d);
        resolve(d)
      })
      .catch(err=>{
        reject(err)
      })
    })
  }


  updateStep(goal_id: string, step:Step):Promise<any>{
      return new Promise((resolve,reject)=>{
        this.http.put(`${this.domain}/goal/step`,{
          goal_id:goal_id,
          step:step
        })
        .then(d=>{
          console.log("d",d);
          resolve(d)
        })
        .catch(err=>{
          reject(err)
        })
      })
    
  }

}
