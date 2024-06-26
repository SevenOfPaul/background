import mongoose ,{ Schema } from "mongoose";
import path from "node:path";
import { fileURLToPath } from "url";
const __filename = path.dirname(fileURLToPath(import.meta.url));
const BookSchema = new Schema({ name: String,crate_at: {type:Date,
    default:new Date().getTime()}, pic: {type:String,default:`${path.join(__filename, "../public/pictures/books/")}default.jpg`},
    pro:{type:String,default:""},goal:{type:Number,default:1},finished:{type:Number,default:0} });
const Book=mongoose.model("Book",BookSchema);
export default Book