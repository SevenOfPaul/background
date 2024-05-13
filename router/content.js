import Router from 'koa-router';
const router = new Router();
import bookContent from "../database/bookContent.js"
import Content from '../database/content.js';
router.post("/add", async (ctx) => {
   new Content(ctx.request.body).save();
    ctx.body = {
        status: "200",
        message: "单词已加入"
    }
})
export default router;