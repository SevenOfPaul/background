import Router from 'koa-router';
const router = new Router();
import Content from '../database/content.js';
import contentValidate from '../validate/content.js';
router.post("/addSentence",async(ctx)=>{
    const {word,sentence}=ctx.request.body;
    let message="";
    let code=200;
     let words=await Content.find({word});
     if(words.length==0){
         code=302;
     message="单词未收录"
     }else{
         words[0].sentence=sentence;
         words[0].save();
         code=200;
         message="例句已添加"
     }
    ctx.body = {
        status: "200",
        data: {
            code,
            message
        }
    }
} )
router.post("/add", async (ctx) => {
    if(!ctx.request.body||contentValidate.validate(ctx.request.body).length!=0) throw new Error("数据格式不对");
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
})
export default router;