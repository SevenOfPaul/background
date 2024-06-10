import Router  from 'koa-router'; 
const router = new Router();
import http from "../http/index.js";
import apis from "../apis.json" assert { type: 'json' };
import jwt from "jsonwebtoken";
import config from "../config/config.json" assert { type: 'json' };
/**
 * @swagger
 * /odor:
 *   get:
 *     summary: 每日一句api
 *     description: 转发请求到扇贝，获取扇贝的每日一句
 */

router.get("/",async (ctx)=>{
    const data= await http("GET",apis["odor"].api);
ctx.body={
    status:"200",
    data:{
        code:200,
        data
    }
}
})

export default router;