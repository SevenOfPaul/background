import Router  from 'koa-router'; 
import Content from '../database/content.js';
import searchDto from '../hooks/search.js';
import mountValidate from '../middleware/mountValidate.js';
import validator from 'validator';
const router = new Router();
/**
 * @swagger
 * /search/{word}:
 *   get:
 *     summary: 搜索指定单词
 *     description: 根据word搜索指定单词
 */

router.get("/:word",mountValidate({word:validator.isAscii}),async (ctx)=>{
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