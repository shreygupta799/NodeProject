import { cleanEnv,port,str } from "envalid";
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING:str(),
    port:port(),
});