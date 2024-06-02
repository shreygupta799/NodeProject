import mongoose from "mongoose";

declare module "express-session" {
    interface SessionData {           //use this exact name SessionData
        userId:mongoose.Types.ObjectId;
    }
}

//also make changes in the tsconfig.json file   "typeRoots", which tels that we can find @types in node_modules and in its own folder also