import Koa from "koa"
const app = new Koa();
//引入路由中间件
import router from "./router/index.js"
// 响应  
import swagger from "./config/swagger.js"
import {koaSwagger} from "koa2-swagger-ui"
//链接数据库
import mongoose from "mongoose";
import koaCors from "koa-cors";
import errorCatch from "./middleware/errorCatch.js";
import logger from "./middleware/logger.js"
import {koaBody} from "koa-body";
mongoose.connect('mongodb://127.0.0.1:27017/english');
const db=await mongoose.connection;
import _static from "./middleware/static.js";
import config from "./config/config.json" assert {type: "json"}
import koaJwt from "koa-jwt";
import auth from "./middleware/auth.js";
//配置map
global.redis=new Map();
//配置swagger文档
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
    routePrefix: '/api',
    swaggerOptions: {
      url: '/api.json', 
    },
}))
app.use(errorCatch);
app.use(logger);
app.use(koaBody({
  multipart: true, 
  formidable: {
    maxFieldsSize:  512 * 512, // 最大文件为2兆
    multipart: true // 是否支持 multipart-formdate 的表单
  }
}))
// app.use(auth([/book/,/pictures/],[/Profile/]));
app.use(koaJwt({ secret: config.secret}).unless({path:[/./]}));
app.use(koaCors({origin:"*"}));
app.use(_static);
app.use(router.routes()); 
app.listen(4320,_=>console.log("服务器已启动"));
