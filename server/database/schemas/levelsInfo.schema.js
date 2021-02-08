import { Schema } from "mongoose";

const levelsInfoSchema = new Schema({
    maxScore:{type:Number,required:true},
    levels:{type:Number,required:true},
    medalsInfo:{type:Object,required:true},
    remark:{type:String,required:false},
});


export default levelsInfoSchema;