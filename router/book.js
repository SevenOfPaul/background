import Router from 'koa-router';
const router = new Router();
import Content from '../database/content.js';
import bookContent from '../database/bookContent.js';
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
router.get("/content/:bookId", async (ctx) => {
    const contentIds = await bookContent.find({ bookId: ctx.params.bookId }).select("contentId");
    let data = [];
    for (let c of contentIds) data.push(await Content.findById(c.contentId));
    ctx.body={
        status: "200",
        ctx: data
    }
  
})
  
export default router;