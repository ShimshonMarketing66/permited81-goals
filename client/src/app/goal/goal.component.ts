import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { GoalModel } from '../models/goal';
import { GoalService } from '../services/goal.service';
import { UserService } from '../services/user.service';
import { AddGoalOrStepComponent,TypeAction} from './add-goal/add-goal.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {
  goals: GoalModel[] = []!
  constructor(
    public router:Router,
    public authService:AuthProcessService,
    public user_service:UserService,
    public goalService:GoalService,
    public dialog: MatDialog) {
    this.goalService.getGoal()
    .then(d=>this.goals = d )
    .catch(err=>{
      alert(JSON.stringify(err))
    })
  }

  setComplete(checked: boolean,goal:GoalModel) {
    goal.completed = checked

    this.goalService.updateGoal(goal)
  }

  ngOnInit(): void {
  }

  openGoalDetail(goal:GoalModel){
    const dialogRef = this.dialog.open(GoalDetailsComponent,{
      data:goal,
      width:"80%",
      height:"70%",
      panelClass:"overflow_anywhere"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addGoal(){
    var typeAction :TypeAction = 'Goal'
    const dialogRef = this.dialog.open(AddGoalOrStepComponent,{
      data:{
        typeAction:typeAction
      },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goals.unshift(result);
      }
     
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl("/login")
    })
  }


}
