import mongoose, {Schema} from "mongoose";
const bookContentSchema=new Schema({bookId:String,contentId:String});
const BookContent=mongoose.model("bookContent",bookContentSchema);
export default BookContent