import Router  from 'koa-router'; 
import Content from '../database/content.js';
import searchDto from '../Res/search.js';
const router = new Router();
/**
 * @swagger
 * /search/{word}:
 *   get:
 *     summary: 搜索指定单词
 *     description: 根据word搜索指定单词
 */

router.get("/:word",async (ctx)=>{
 const data= await Content.find({word:{ $regex: `${ctx.params.word}` }});
ctx.body={
    status:"200",
    data:{
        code:200,
        data:await searchDto(data)
    }
}
})

export default router;