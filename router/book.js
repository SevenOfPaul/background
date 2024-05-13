import Router from 'koa-router';
const router = new Router();
import Content from '../database/content.js';
import bookContent from '../database/bookContent.js';
import Book from '../database/book.js';
import proValidate from "../validate/pro.js"
import {isValidObjectId} from "mongoose"
import {koaBody} from "koa-body";
/**
 * @swagger
 * /book/content/{bookId}:
 *   get:
 *     summary: Json类型的单词数组.
 *     description: 根据提交的书记api获取全部单词
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: 书籍id
 *         schema:
 *           type: String
 *   
 */
router.get("/all/:bookId", async (ctx) => {
    const contentIds = await bookContent.find({ bookId: ctx.params.bookId }).select("contentId");
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
         data
    }
  
})
router.post("/learned", async (ctx) => {
    const {bookId,pro}=ctx.request.body;
    if(!isValidObjectId(bookId)||!proValidate.validate(pro)) throw new Error("数据不合规");
     await Book.updateOne({_id:bookId},{pro});
    ctx.body={
        status: "200",
        data: {code:200,message:"输入完成"}
    }
})
   
export default router;