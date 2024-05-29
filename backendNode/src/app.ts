import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from "./routes/notes";
import mongoose from "mongoose";
import morgan from "morgan"
import createHttpError,{isHttpError} from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());  //it will help to create post api

app.use("/api/notes",notesRoutes);

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