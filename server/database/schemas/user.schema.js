import { Schema } from "mongoose";
import  sha256 from "sha256";

const userSchema = new Schema({
    hashedPassword:{type:String,required:true},
    email : {type:String,required:true},
    username:{type:String,required:true},
    image:{type:String,required:true},
    score:{type:Number,required:true},
    medalId:{type:String,required:false},
    remark:{type:String,required:false},
    name:{type:String,required:true}


});

/**
 * @param {*} password
 */

userSchema.methods.comparePassword = function comparePassword(password){
    return this.hashedPassword === sha256(password);
}

export default userSchema;