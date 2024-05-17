import mongoose, {Schema} from "mongoose";
const ContentSchema=new Schema({mean:String,word:String,phonetic_symbol:String,initial:String});
// ContentSchema.post("")
const Content=mongoose.model("Content",ContentSchema);
export default Content