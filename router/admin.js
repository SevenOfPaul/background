import Router from "koa-router";
import Book from "../database/book.js";
import UserBook from "../database/userBook.js";
import User from "../database/user.js";
import userBook from "../database/userBook.js";
import bookContent from "../database/bookContent.js";
import Content from "../database/content.js";

const router = new Router();
router.post("/words",async (ctx)=>{
 const {bookId,word}=ctx.request.body;
 //有
   let c= await Content.find({word:word.word})
    if(c.length){
        c[0].sentence=word.sentence;
        c[0].mean=word.mean;
        let res=await c[0].save();
        ctx.body={
            status:200,
            res
        }
        return
    }
 //无
 const  content=new Content(word);
     await content.save();
    // console.log(bookId)
     const bc=new bookContent({bookId,contentId:content._id});
     const res=await bc.save();
 ctx.body={
     status:200,
     res
 }
});
router.post("/addB",async (ctx)=>{
    const {name}=ctx.request.query;
     const book=new Book({name:name});
     const users=await User.find({});
     let userbook=[];
     for(let v of users){
         userbook.push(new UserBook({bookId:book._id,userId:v._id}));
     }
     UserBook.insertMany(userbook);
    await book.save();
    ctx.body={
        status:200,
        bookId:book._id,
        userbook
    }
});
export default router;