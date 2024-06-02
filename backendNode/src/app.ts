import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from "./routes/notes";
import mongoose from "mongoose";
import morgan from "morgan"
import createHttpError,{isHttpError} from "http-errors";
import userRoutes from "./routes/user"
import session from "express-session";
import { envalidErrorFormatter } from "envalid";
import env from "./util/validateEnv"
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));

app.use(express.json());  //it will help to create post api


app.use(session({           //session middleware must be kept after the express.json() middleware and before the routes
   secret:env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000,
    },
    rolling:true,
    store:MongoStore.create({mongoUrl:env.MONGO_CONNECTION_STRING}),
}));

app.use("/api/notes",notesRoutes);

app.use("/api/users",userRoutes)

app.use((req,res,next)=>{
    next(createHttpError(404,"End pointNot found"));   
})

app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
    console.error(error);
    let errorMessage="An error has occured";
    let statusCode=500;
    if(isHttpError(error)){
      statusCode=error.statusCode;
      errorMessage=error.message;
    }
    res.status(statusCode).json({error:errorMessage});
})



export default app;