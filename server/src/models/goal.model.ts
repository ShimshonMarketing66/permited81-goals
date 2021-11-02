import { Step } from "./step.model";

export interface GoalModel{
    name:string;
    description:string;
    createdDate:Date;
    completed:boolean;
    steps:Step[];
    dueDate:Date;
    user_id:string;
    _id:string
}