import Koa from "koa"
const app = new Koa();
//引入路由中间件
import router from "./router/index.js"
// 响应
app.use(router.routes());   
import swagger from "./config/swagger.js"
import {koaSwagger} from "koa2-swagger-ui"
import sequelize from "./database/index.js"
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