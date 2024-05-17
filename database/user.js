import mongoose ,{ Schema } from "mongoose";
const userSchema = new Schema({ name: String, crate_at: {type:Date,default:new Date().getTime()},email:String,password:String, pic: String,token:{type:String,default:""} });
const User=mongoose.model("User",userSchema);
export default User