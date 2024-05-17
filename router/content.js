import Router from 'koa-router';
const router = new Router();
import Content from '../database/content.js';
import contentValidate from '../validate/content.js';
/**
 * @swagger
 * /content/add:
 *   post:
 *     summary: 添加单词到单词库
 *     description: 添加单词到单词库
 *   
 */
router.post("/add", async (ctx) => {
    if(contentValidate.validate(ctx.request.body).length!=0) throw new Error("数据格式不对");
    let message = "";
    if (!(await Content.find({ mean: ctx.request.body.mean })).length) {
        message = "单词加入成功";
        await new Content(ctx.request.body).save();
    } else message = "单词已收录，无需重复添加";
    ctx.body = {
        status: "200",
        data: {
            code: 200,
            message
        }
    }
}
)
export default router;