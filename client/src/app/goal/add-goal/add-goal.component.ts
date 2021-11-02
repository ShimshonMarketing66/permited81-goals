import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalModel } from 'src/app/models/goal';
import { GoalService } from 'src/app/services/goal.service';

export type TypeAction = "Goal"|"Step";


@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalOrStepComponent {
  angForm: FormGroup;
  dueDate: string;
  typeAction:TypeAction;

  constructor(
    private fb: FormBuilder,
    private goalService:GoalService,
    private dialogRef: MatDialogRef<AddGoalOrStepComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      typeAction:TypeAction,
      goal_id:string
    }
    ) {
    
      this.typeAction = this.data.typeAction;

    //add 1 week to the goal step
    let d = new Date();
    d.setDate(d.getDate()+7)
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    this.dueDate = `${ye}-${mo}-${da}`

    this.createGroup();
  }


  createGroup() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [this.dueDate, Validators.required]
    });
  }

  add(){    
    if (this.typeAction === "Goal") {
      this.goalService.addGoal({
        name: this.angForm.value.name,
        description: this.angForm.value.description,
        dueDate:new Date(this.angForm.value.dueDate) 
      })
      .then((data)=>{
       this.dialogRef.close(data)
      })
      .catch((err)=>{
        alert(JSON.stringify(err))
      })
    }


    if (this.typeAction === "Step") {
      this.goalService.addStep(this.data.goal_id,{ 
          name: this.angForm.value.name,
          description: this.angForm.value.description,
          dueDate:new Date(this.angForm.value.dueDate)    
      })
      .then((updatedGoal:GoalModel)=>{
       this.dialogRef.close(updatedGoal)
      })
      .catch((err)=>{
        alert(JSON.stringify(err))
      })
    }
  
  }
}
