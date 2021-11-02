import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalModel } from 'src/app/models/goal';
import { Step } from 'src/app/models/step';
import { GoalService } from 'src/app/services/goal.service';
import { AddGoalOrStepComponent, TypeAction } from '../add-goal/add-goal.component';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent implements OnInit {
  a: boolean = true
  constructor(
    private goalService: GoalService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public goal: GoalModel
  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setComplete(checked: boolean, step: Step) {
    step.completed = checked

    this.goalService.updateStep(this.goal._id, step)
    this.sortSteps()
  }

  addStep() {
    let typeAction: TypeAction = "Step"
    const dialog = this.dialog.open(AddGoalOrStepComponent, {
      data: {
        typeAction: typeAction,
        goal_id: this.goal._id
      }
    })

    dialog.afterClosed().subscribe((updatedGoal: GoalModel) => {
      if (updatedGoal) {
        this.goal.steps = updatedGoal.steps;
        this.sortSteps()
      }
    })


  }

  sortSteps() {
    this.goal.steps = this.goal.steps.sort((a, b) => {
      let d1 = new Date(a.createdDate);
      let d2 = new Date(b.createdDate);
      if ((d1.getTime() > d2.getTime()) && !a.completed) {
        return 1;
      }
      return 0;
    })
  }

}
