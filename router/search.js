import Router  from 'koa-router'; 
import Content from '../database/content.js';
import searchDto from '../Res/search.js';
const router = new Router();
/**
 * @swagger
 * /search:
 *   get:
 *     summary: 翻译单词或汉语
 *     description: 翻译单词或汉语
 */

router.get("/:word",async (ctx)=>{
 const data= await Content.find({word:{ $regex: `${ctx.params.word}` }});
ctx.body={
    status:"200",
    data:await searchDto(data)
}
})

export default router;