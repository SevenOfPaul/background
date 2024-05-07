import axios from "axios"
import Router  from 'koa-router'; 
const router = new Router();
import data from "../apis.json" assert { type: 'json' };
const {apis}=data
router.get("/",async (ctx)=>{
    console.log(ctx.request.query)
    const {data}=await axios.get(`https://apiv3.shanbay.com/weapps/dailyquote/quote/`);
ctx.body={
    translation:data.translation,
    content:data.content
}
})

export default router;