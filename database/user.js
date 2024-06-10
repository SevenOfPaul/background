import mongoose ,{ Schema } from "mongoose";
const userSchema = new Schema({ name: String, create_at: {type:Date,default:new Date().getTime()},
email:String,password:String, pic: String,
token:{type:String,default:""},studyingBookId:String });
const User=mongoose.model("User",userSchema);
export default User