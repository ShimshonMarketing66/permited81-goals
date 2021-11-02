import cors from "cors";
import express,{Application,Request,Response,NextFunction} from "express";
import * as goalRouter from './goal/goal';
import { connectDatabase } from "./services/connection.database";
import  * as admin  from "firebase-admin";



const app:Application = express();

/** app use  */
app.use(express.json());
app.use(cors())
app.use(checkJWT)
app.use('/goal', goalRouter.router);


//initialize the connection to the database
connectDatabase();



var serviceAccount = require("./firebase-service-account");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

app.listen(3000,()=>{
    console.log("listen on port 3000");
})

function checkJWT(req:Request,res:Response,next:NextFunction) {
    let idToken = req.query.idToken || req.body.idToken
    if (!idToken) {
        return res.status(401).send("missing idToken in query or body");
    }
    admin.app().auth().verifyIdToken(idToken).then((user)=>{
        res.locals.user_id = user.uid;
        next()
    }).catch(err=>{
        return res.status(401).send("idToken is not valid.");
    })
}
