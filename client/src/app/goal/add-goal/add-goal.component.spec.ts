import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalOrStepComponent } from './add-goal.component';

describe('AddGoalOrStepComponent', () => {
  let component: AddGoalOrStepComponent;
  let fixture: ComponentFixture<AddGoalOrStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoalOrStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoalOrStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
