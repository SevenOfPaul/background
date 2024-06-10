import Router from 'koa-router';
const router = new Router();
import Content from '../database/content.js';
import bookContent from '../database/bookContent.js';
import Book from '../database/book.js';
import fs from "node:fs";
import { isValidObjectId} from "mongoose"
import BookContent from '../database/bookContent.js';
import { fileURLToPath } from "url";
import {nanoid} from "nanoid";
import path from "path"
import maxFile from '../middleware/maxFile.js';
const __filename = path.dirname(fileURLToPath(import.meta.url));
import mountValidate from '../middleware/mountValidate.js';
import validator from 'validator';
import userBook from "../database/userBook.js";
import jwt from "jsonwebtoken";
import config from "../config/config.json" assert {type:"json"};
import User from "../database/user.js"

router.get("/",async (ctx) => {
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const user=await User.findById(userId);
    const contentIds = await bookContent.find({bookId:user.studyingBookId}).select("contentId");
   const book= await Book.findById(user.studyingBookId);
    book.pic=path.join("http://localhost:4320", book.pic);
    ctx.body={
        status: "200",
        data:{
            code:200,
            data:{
                  book,
                  quantity:contentIds.length
            }
        }
    }
})
router.get("/all/:bookId", mountValidate({bookId:isValidObjectId}),async (ctx) => {
    const contentIds = await bookContent.find({ bookId: ctx.params.bookId }).select("contentId");
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
         data:{
            code:200,
            data
         }
    }
})
router.get("/desk",async (ctx) => {
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const books=await userBook.find({userId});
     const data=[];
     for(let v of books){
         let book=await Book.findById(v.bookId);
         book.pic=path.join("http://localhost:4320", book.pic);
         data.push(book);
     };
    ctx.body={
        status: "200",
        data:{
            code:200,
            data
        }
    }
})
router.post("/study/page",async (ctx) => {
    const {page,bookId,number,pro} = ctx.request.body;
    const contentIds = await bookContent.find({ bookId }).select("contentId").skip(parseInt(pro)+parseInt(page*number)).limit(number);
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
        data:{
            code:200,
            data
        }
    }
})
router.post("/learned/page",async (ctx) => {
    const {page,bookId,number,pro} = ctx.request.body;
    const contentIds = await bookContent.find({ bookId }).select("contentId")
        .skip(page*number).limit(number);
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
        data:{
            code:200,
            data
        }
    }
})
router.post("/new/page",async (ctx) => {
    const {page,bookId,number,pro} = ctx.request.body;
    const skip=parseInt(pro)+parseInt(page*number)>=0?parseInt(pro)+parseInt(page*number):0;
    const contentIds = await bookContent.find({ bookId })
        .select("contentId")
        .skip(skip).limit(number);
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
        data:{
            code:200,
            data
        }
    }
})
router.post("/review/page",async (ctx) => {
    const {page,bookId,number,pro,goal} = ctx.request.body;
    const skip=parseInt(pro)+parseInt(page*number)-parseInt(goal*3)>=0?parseInt(pro)+parseInt(page*number)-parseInt(goal*3):0;
    const contentIds = await bookContent.find({ bookId })
        .select("contentId")
        .skip(skip).limit(number);
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
        data:{
            code:200,
            data
        }
    }
})
router.post("/learned",async (ctx) => {
    const {todayFinished,bookId} = ctx.request.body;
    const book = await Book.findById(bookId);
     book.todayFinished=todayFinished;
    await book.save();
    console.log(book)
    ctx.body={
        status: "200",
        data:{
            code:200,
            message:"保存完成"
        }
    }
})
router.get("/add/:name", async (ctx) => {
    const book=new Book({name:ctx.params.name});
    await book.save();
    ctx.body={
        status: "200",
         data:{
            code:200,
            message:"单词书创建完毕"
         }
    }
})
router.get("/remove/:bookId",mountValidate({bookId:isValidObjectId}), async (ctx) => {
    await Book.deleteOne({_id:ctx.params.bookId});
    ctx.body={
        status: "200",
         data:{
            code:200,
            message:"单词书删除完毕"
         }
    }
})

router.post("/contentOfGoal",mountValidate({bookId:isValidObjectId,goal:validator.isInt}), async (ctx) => {
    let {bookId,goal,todayFinished}=ctx.request.body;
    //先确定目标单词数量
    const book = await Book.findById(bookId);
    if(book.finished){
        ctx.body={
            status: "200",
             data:{
                code:401,
                message:"本书已学完"
             }
        }
        return ;
    }
    goal=parseInt(goal)+(book.pro<=goal*3?book.pro:goal*3);
    const contentIds = (await bookContent.find({bookId},{_id:0,bookId:0})).map(c=>c.contentId);
    let data=[];
    data.push(...await Content.find({_id:{$in:contentIds}}).skip(goal==book.pro?0:book.pro+parseInt(todayFinished)).limit(goal));
    ctx.body={
        status: "200",
         data:{
            code:200,
            data
         }
    }
})
router.get("/getStudyBook", async (ctx) => {
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const user=await User.findById(userId);
     const data=await Book.findById(user.studyingBookId);
    data.pic=path.join("http://localhost:4320", data.pic);
 ctx.body={
     status:200,
     data:{
         code:200,
         data
     }
 }
})
router.get("/changeStudyBook", async (ctx) => {
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const {bookId}=ctx.request.query;
  await User.updateOne({_id:userId},{studyingBookId:bookId});
    ctx.body={
        status:200,
        data:{
            code:200,
            message:"修改完毕,刷新后显示"
        }
    }
})
router.post("/settings", async (ctx) => {
    let {bookId,goal,sequence}=ctx.request.body;
    await Book.updateOne({_Id:bookId},{goal});
    //先确定目标单词数量
    const book = await Book.findById(bookId);
    book.goal=goal
    book.sequence=sequence
     await book.save();
    ctx.body={
        status: "200",
        data:{
            code:200,
            message:"修改成功"
        }
    }
})
router.post("/addWords", mountValidate({bookId:isValidObjectId,contentId:isValidObjectId}), async (ctx) => {
    const {bookId,contentId}=ctx.request.body;
    if(!isValidObjectId(bookId)||!isValidObjectId(contentId)) throw new Error("数据不合规");
    const newBookContent=new BookContent({bookId,contentId});
     await newBookContent.save();
    ctx.body={
        status: "200",
        data: {code:200,message:"单词已添加完成"}
    }
})
router.post("/removeWords",mountValidate({bookId:isValidObjectId,contentId:isValidObjectId}), async (ctx) => {
    const {bookId,contentId}=ctx.request.body;
    if(!isValidObjectId(bookId)||!isValidObjectId(contentId)) throw new Error("数据不合规");
     await BookContent.deleteOne({bookId,contentId});
    ctx.body={
        status: "200",
        data: {code:200,message:"单词已删除"}
    }
})

router.post("/addPic",mountValidate({bookId:isValidObjectId}),maxFile(512*512), async (ctx) => {
        const {bookId}=ctx.request.body;
        const {pic}=ctx.request.files;
        const fileReader= fs.createReadStream(pic.filepath);
        const filePath=`${path.join(__filename,"../public/pictures/books/")}${nanoid()}.jpg`;
        const fileHandler= fs.createWriteStream(filePath);
         Book,updateOne({_id:bookId},{pic:filePath});
        //把读流中的数据写入到写流中
        fileReader.pipe(fileHandler);
    ctx.body={
        status: "200",
        data:{code:200,message:"封面添加成功",req:ctx.request}
    }
})  
export default router;