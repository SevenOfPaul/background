import mongoose, {Schema} from "mongoose";
const userBookSchema=new Schema({userId:String,bookId:String});
const UserBook=mongoose.model("userBook",userBookSchema);
export default UserBook