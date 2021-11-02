import { model, Schema } from "mongoose";
import { GoalModel } from "../models/goal.model";
import { Step } from "../models/step.model";

const schema = new Schema<GoalModel>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        createdDate: { type: Date, required: true, default: () => { return new Date() } },
        dueDate: { type: Date, required: true },
        completed: { type: Boolean, default: false },
        steps: {
            type: [{
                name: String,
                description: String,
                dueDate: Date,
                completed:Boolean
            }], default: []
        },
        user_id: { type: String, required: true },

    },
    {
        versionKey: false
    }
);

const _GoalModel = model<GoalModel>('goals', schema);


export module dbHelper {
    export function insertGoal(goal: GoalModel) {
        const doc = new _GoalModel(goal);
        return doc.save();
    }

    export function getGoal(goal_id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                var goal = await _GoalModel.findById(goal_id)
                resolve(goal);
            } catch (error) {
                reject(error);
            }
        })
    }

    export function getGoals(user_id: string, skip: number = 0, order: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                var goals = await _GoalModel.find({
                    user_id: user_id
                })
                    .sort({
                        "createdDate": order
                    })
                    //    .skip(skip)
                    .limit(20)
                resolve(goals);
            } catch (error) {
                reject(error);
            }
        })

    }

    export function updateGoal(goal:GoalModel): Promise<any> {
        try {
            var result = _GoalModel.updateOne({
                _id: goal._id
            }, goal)
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }

    }

    export function removeGoal(goal_id: string): Promise<any> {
        try {
            var result = _GoalModel.deleteOne({
                _id: goal_id
            })
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }

    }

    export function addStep(goal_id: string, step): Promise<any> {
        try {
            var result = _GoalModel.findOneAndUpdate({
                _id: goal_id
            }, {
                $addToSet: {
                    steps: step
                }
            }, { new: true })

            //return the new step (important the client side)
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }

    }
    export function removeStep(goal_id: string, step_id: string): Promise<any> {
        try {
            var result = _GoalModel.updateOne({
                _id: goal_id
            }, {
                $pull: { 'steps._id': step_id }
            })
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }

    }

    export function updateStep(goal_id: string, step: Step): Promise<any> {
        try {
            var result = _GoalModel.findOneAndUpdate({
               "steps._id": step._id
            }, {
                $set: {
                    'steps.$.completed': step.completed
                }
            })
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }

    }




}