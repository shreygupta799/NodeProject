import express from "express";
import {signUp,logIn,getAutenticatedUser, logout} from "../controller/user";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/login",logIn);

router.get("/",getAutenticatedUser);

router.post("/logout",logout);

export default router;
