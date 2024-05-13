import mongoose ,{ Schema } from "mongoose";
const BookSchema = new Schema({ name: String, crate_at: Date, pic: String,pro:String });
const Book=mongoose.model("Book",BookSchema);
export default Book