import Koa from "koa"
const app = new Koa();
//引入路由中间件
import router from "./router/index.js"
// 响应
app.use(router.routes());   
import swagger from "./config/swagger.js"
import {koaSwagger} from "koa2-swagger-ui"
import database from "./database/index.js";
import Book from "./database/model/book.model.js";
import bookEntity from "./database/entity/book.entity.js";
try{
await database.initialize();
}catch{
  console.error("数据库连接失败")
}
app.use(router.allowedMethods());
//配置swagger文档
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
    routePrefix: '/api',
    swaggerOptions: {
      url: '/api.json', 
    },
}))
app.listen(4320);