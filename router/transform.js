import Router  from 'koa-router'; 
const router = new Router();
import http from "../http/index.js"
import apis from "../apis.json" assert { type: 'json' };
import validator from "validator"
/**
 * @swagger
 * /odor:
 *   get:
 *     summary: 翻译api
 *     description: 转发请求到翻译网址
 */

router.get("/:text",async (ctx)=>{
    let params;
    if(validator.blacklist(ctx.params.text,/[\u4e00-\u9fa5]/)){
         params={text:ctx.params.text,from:"zh-CN",to:"en"}
    }else if(validator.blacklist(ctx.params.text,(/[a-zA-Z]/))){
         params={text:ctx.params.text,from:"en",to:"zh-CN"}
    }else{
     throw new Error("数据不合规")
    }
    const data= await http("GET",apis["transform"].api,params).data;
   
ctx.body={
    status:"200",
    data
}
})

export default router;