
import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema=new Schema({
 title:{type:String,required:true},
 text:{type:String},
},{timestamps:true});

type note=InferSchemaType<typeof noteSchema>;

export default model<note>("note",noteSchema);  