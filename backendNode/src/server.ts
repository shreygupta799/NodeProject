import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.port;


mongoose.connect(env.MONGO_CONNECTION_STRING!).then(() => {
    console.log("Connected to the database");
    app.listen(port!, () => {
        console.log("Server is running on the port" + port);
    });
}).catch(console.error );

