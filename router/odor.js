import Router  from 'koa-router'; 
const router = new Router();
import http from "../http/index.js"
import apis from "../apis.json" assert { type: 'json' };
/**
 * @swagger
 * /odor:
 *   get:
 *     summary: 每日一句api
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

router.get("/",async (ctx)=>{
    const data= await http("GET",apis["odor"].api);
ctx.body={
    status:"200",
    data
}
})

export default router;