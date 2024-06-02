import{InferSchemaType, Schema, model} from "mongoose";

const userSchema= new Schema({
   username:{type:String,required:true,unique:true},
   email:{type:String,required:true,unique:true,select:false},   //The select: false option means that the email and password fields will not be included by default when fetching documents from the database. This is useful for fields that contain sensitive information that you don't want to expose unnecessarily, like passwords.
   password:{type:String,required:true,select:false},
})

type user=InferSchemaType<typeof userSchema>;

export default model<user>("user",userSchema);  