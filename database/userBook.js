import mongoose, {Schema} from "mongoose";
const userBookSchema=new Schema({useId:String,bookId:String});
const UserBook=mongoose.model("userBook",userBookSchema);
export default UserBook