import Koa from "koa"
const app = new Koa();
//引入路由中间件
import router from "./router/index.js"
// 响应  
import swagger from "./config/swagger.js"
import {koaSwagger} from "koa2-swagger-ui"
//链接数据库
import mongoose from "mongoose";
// import logger from "./middleware/logger.js";
import errorCatch from "./middleware/errorCatch.js";
import logger from "./middleware/logger.js";
mongoose.connect('mongodb://127.0.0.1:27017/english')
const db=await mongoose.connection;
// db.watch().on("change",(data,target)=>{console.log(data)})
// try{
// }catch{
// }
// app.use(router.allowedMethods());
//配置swagger文档
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
    routePrefix: '/api',
    swaggerOptions: {
      url: '/api.json', 
    },
}))
app.use(logger)
app.use(errorCatch)
app.use(router.routes()); 
app.listen(4320,_=>console.log("服务器已启动"));
