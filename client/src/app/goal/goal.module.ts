import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalComponent } from './goal.component';


import {MatCardModule} from '@angular/material/card';
import { GoalRoutingModule } from './goal-routing';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import {MatIconModule} from '@angular/material/icon';
import { AddGoalOrStepComponent } from './add-goal/add-goal.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    GoalComponent,GoalDetailsComponent, AddGoalOrStepComponent
  ],
  imports: [
    CommonModule,
    GoalRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers:[MatNativeDateModule],
  exports:[MatDialogModule]  
})
export class GoalModule { }
