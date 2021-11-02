import express, { Request, Response, NextFunction } from "express";
import { GoalModel } from "../models/goal.model";
import { dbHelper } from "../services/helper-database";


export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const goal_id: string = req.query.goal_id as string

    //get single goal
    if (goal_id) {
        dbHelper.getGoal(goal_id)
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                res.status(500).send({
                    message: "not found",
                    er: err
                })
            })

    } 
    //get the last 20 goals
    else {
        var skip = 0;
        if (req.query.skip) {
            skip = parseInt(req.query.skip as string);
        }
        var orderDate = -1;
        if (req.query.order_date) {
            orderDate = parseInt(req.query.order_date as string);
        }
        dbHelper.getGoals(res.locals.user_id as string, skip, orderDate)
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                res.status(500).send({
                    message: "not found",
                    er: err
                })
            })
    }
});

router.post('/', async (req: Request, res: Response) => {

    //check description and name are valid.
    if (!req.body.goal?.description) {
        return res.status(500).send({ message: "description is missing" });
    }
    if (!req.body.goal?.name) {
        return res.status(500).send({ message: "name is missing" });
    }

    //check due date
    let d1 = new Date(req.body.goal?.dueDate);
    if (isNaN(d1.getTime())) {
        return res.status(500).send({ message: "dueDate is missing or invalid" });
    }

    //check steps (minimum 1)
    if (Array.isArray(req.body.goal?.steps)) {
        req.body.goal.steps.forEach((element: any) => {
            if (!element.name || !element.description || !element.dueDate) {
                return res.status(500).send({ message: "steps array is invalid (excepted values : name,description,dueDate" });
            }
            let d1 = new Date(element.dueDate);
            if (isNaN(d1.getTime())) {
                return res.status(500).send({ message: "dueDate in steps array is invalid" });
            }
        });
    }

    req.body.goal.user_id = res.locals.user_id;
    dbHelper.insertGoal(req.body.goal)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.statusCode = 500;
            res.send({
                message: "error in database.",
                err:err
            })
        })

});

router.put('/', (req: Request, res: Response) => {
   
    if (!req.body.goal) {
        return res.status(400).send({ message: "goal object is missing" });
    }

    const goal:GoalModel = req.body.goal

    if (!goal._id) {
        return res.status(400).send({ message: "goal_id is missing" });
    }

    dbHelper.updateGoal(goal)
        .then(_res => {
            res.send(_res);
        })
        .catch(err => {
            res.status(500).send(err);
        })

});

router.delete('/', (req: Request, res: Response) => {
    if (!req.body.goal_id) {
        return res.status(400).send({ message: "goal_id is missing" });
    }

    dbHelper.removeGoal(req.body.goal_id)
        .then(_res => {
            res.send(_res);
        })
        .catch(err => {
            res.status(500).send(err);
        })

});

router.post('/step', (req: Request, res: Response) => {
    if (!req.body.step) {
        return res.status(400).send({ message: "step is missing" });
    }

    if (!req.body.goal_id) {
        return res.status(400).send({ message: "goal_id is missing" });
    }

    dbHelper.addStep(req.body.goal_id, req.body.step)
        .then(_res => {
            res.send(_res);
        })
        .catch(err => {
            res.status(500).send(err);
        })

})

router.put('/step', (req: Request, res: Response) => {

    if (!req.body.step) {
        return res.status(400).send({ message: "step object is missing" });
    }

    if (!req.body.goal_id) {
        return res.status(400).send({ message: "goal_id is missing" });
    }

    dbHelper.updateStep(req.body.goal_id, req.body.step)
        .then(_res => {
            res.send(_res);
        })
        .catch(err => {
            res.status(500).send(err);
        })

})

router.delete('/step', (req: Request, res: Response) => {
    if (!req.body.step_id) {
        return res.status(400).send({ message: "step_id is missing" });
    }

    if (!req.body.goal_id) {
        return res.status(400).send({ message: "goal_id is missing" });
    }

    dbHelper.removeStep(req.body.goal_id, req.body.step_id)
        .then(_res => {
            res.send(_res);
        })
        .catch(err => {
            res.status(500).send(err);
        })

})








