import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

interface signUpBody{
    username?:string;
    email?:string;
    password?:string;

}
    export const signUp:RequestHandler<unknown,unknown,signUpBody,unknown>=async(req, res,next) => {
        const username=req.body.username;
        const email=req.body.email;
        const passwordRaw=req.body.password;
        try {

            if(!username||!email||!passwordRaw){
                throw(createHttpError(400,"Parameters not found"));
            }
            
            const exixtingUser=await UserModel.findOne({username:username}).exec();
            if(exixtingUser){
                throw createHttpError(409,"Username already exists");
            }

            const exixtingEmail=await UserModel.findOne({email:email}).exec();
            if(exixtingEmail){
                throw createHttpError(409,"Email already exists");
            }
              
            const saltRounds = 10;
            const passwordHashed=await bcrypt.hash(passwordRaw, saltRounds);

            const newUser=await UserModel.create({
                username:username,
                email:email,
                password:passwordHashed,
            });
              req.session.userId=newUser._id;
            res.status(201).json(newUser);
    
           
        } catch (error) {
            next(error);
        }
    };


    interface loginBody{
        username?:string;
        password?:string;   
    }

    export const logIn:RequestHandler<unknown,unknown,loginBody,unknown>=async(req,res,next)=>{
      const username=req.body.username;
      const password=req.body.password;
     
      try {
        if(!username||!password)
            throw createHttpError(400,"Parameters not found");

        const user=await UserModel.findOne({username:username}).select('+password +email').exec();
        

        if(!user)
            throw createHttpError(404,"User not found");
        
        const passwordMatch=await bcrypt.compare(password,user.password);
        
        if(!passwordMatch)
            throw createHttpError(401,"Invalid password");

        req.session.userId=user._id;
        res.status(200).json(user);
        
      } catch (error) {
        next(error);
      }
    };

    export const getAutenticatedUser:RequestHandler=async(req,res,next)=>{
        const  autenticatedUserId=req.session.userId;
        
        try {
            if(!autenticatedUserId)
                throw createHttpError(401,"User not Authenticated");  

            const user=await UserModel.findById(autenticatedUserId).select("+email").exec();
            if(!user)
                throw createHttpError(404,"User not found");
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    export const logout:RequestHandler=async(req,res,next)=>{
        req.session.destroy((error)=>{
            if(error)
                next(error);
            else
                res.sendStatus(200);
}
);
    }