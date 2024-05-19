import Router from 'koa-router';
const router = new Router();
import Content from '../database/content.js';
import bookContent from '../database/bookContent.js';
import Book from '../database/book.js';
import fs from "node:fs";
import {Schema, isValidObjectId} from "mongoose"
import BookContent from '../database/bookContent.js';
import { fileURLToPath } from "url";
import {nanoid} from "nanoid";
import path from "path"
import maxFile from '../middleware/maxFile.js';
const __filename = path.dirname(fileURLToPath(import.meta.url));
import mountValidate from '../middleware/mountValidate.js';
import validator from 'validator';
/**
 * @swagger
 * /book/content/{bookId}:
 *   get:
 *     summary: Json类型的单词数组.
 *     description: 根据提交的书记api获取全部单词
 */
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

/**
 * @swagger
 * /book/contentOfGoal:
 *   post:
 *     summary: 获取今天学习的单词.
 *     description: 根据目标获取今天学习的单词.
 *   
 */
router.post("/contentOfGoal",mountValidate({bookId:isValidObjectId,goal:validator.isInt}), async (ctx) => {
    let {bookId,goal}=ctx.request.body;
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
    const {initial,num}=JSON.parse(book.pro);
    goal=goal+num<goal*3?num:goal*3;
    const contentIds = (await bookContent.find({bookId},{_id:0,bookId:0})).map(c=>c.contentId);
    let data=[];
    data.push(...await Content.find({_id:{$in:contentIds},initial}).skip(goal==num?0:num).limit(goal));
    ctx.body={
        status: "200",
         data:{
            code:200,
            data
         }
    }
})
/**
 * @swagger
 * /book/setGoal:
 *   post:
 *     summary: 设置学习目标
 *     description: 提交bookId和goal设置学习目标.
 *   
 */
router.post("/setGoal",mountValidate({bookId:isValidObjectId,goal:validator.isInt}), async (ctx) => {
    let {bookId,goal}=ctx.request.body;
    await Book.updateOne({_Id:bookId},{goal});
    //先确定目标单词数量
    const book = await Book.findById(bookId);
    ctx.body={
        status: "200",
        data:{
            code:200,
            message:"修改成功"
        }
    }
})
/**
 * @swagger
 * /book/learned:
 *   post:
 *     summary: 学习完成 修改学习进度
 *     description: 根据bookId和pro学习完成 修改学习进度.
 *   
 */
router.post("/learned", mountValidate({bookId:isValidObjectId,contentId:isValidObjectId}),async (ctx) => {
    //需要修改
    let {bookId,contentId,initial}=ctx.request.body;
    if(!isValidObjectId(bookId)||!isValidObjectId(contentId)) throw new Error("数据不合规");
     const contents=(await Content.find({initial})).map(c=>c._id);
     let idx=contents.findIndex(c=>c==contentId);
     if(idx==contents.length-1){
        if(initial=="Z"){
           await Book.updateOne({_id:bookId},{finished:1});
        ctx.body={
            status: "200",
            data: {code:200,message:"恭喜学习完成"}
        }
        return ;
        }
        initial=String.fromCharCode(initial.charCodeAt()+1); 
        idx=0;   
     }
     await Book.updateOne({_id:bookId},{pro:JSON.stringify({initial,num:idx})});
     ctx.body=ctx.body?ctx.body:{
        status: "200",
        data: {code:200,message:"输入完成"}
    }
})
/**
 * @swagger
 * /book/addWords:
 *   post:
 *     summary: 添加指定单词到单词书
 *     description: 根据bookId和contentId添加指定单词到单词书
 *   
 */
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
/**
 * @swagger
 * /book/removeWords:
 *   post:
 *     summary: 从指定单词书中删除单词
 *     description: 根据bookId和contentId删除指定单词到单词书
 *   
 */
router.post("/removeWords",mountValidate({bookId:isValidObjectId,contentId:isValidObjectId}), async (ctx) => {
    const {bookId,contentId}=ctx.request.body;
    if(!isValidObjectId(bookId)||!isValidObjectId(contentId)) throw new Error("数据不合规");
     await BookContent.deleteOne({bookId,contentId});
    ctx.body={
        status: "200",
        data: {code:200,message:"单词已删除"}
    }
})

/**
 * @swagger
 * /book/addPic:
 *   post:
 *     summary: 提交单词书书封
 *     description: 提交单词书封面，数据大小不超过512kb
 *   
 */
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