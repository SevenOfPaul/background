import Router  from 'koa-router'; 
const router = new Router();
import http from "../http/index.js"
import apis from "../apis.json" assert { type: 'json' };
import validator from "validator"
/**
 * @swagger
 * /transform:
 *   get:
 *     summary: 翻译api
 *     description: 转发请求到翻译网址
 */

router.get("/:text",async (ctx)=>{
    let params;
    if(validator.matches(ctx.params.text,/[\u4e00-\u9fa5]/)){
         params={text:ctx.params.text,from:"zh-CN",to:"en"};
    }else if(validator.matches(ctx.params.text,(/[a-zA-Z]/))){
         params={text:ctx.params.text,from:"en",to:"zh-CN"};
    }else{
     throw new Error("数据不合规");
    }
ctx.body={
    status:"200",
    data: await http("GET",apis["transform"].api,params)
}
})

export default router;