import Koa from "koa"
const app = new Koa();
//引入路由中间件
import router from "./router/index.js"
// 响应
app.use(router.routes());   
app.use(router.allowedMethods());
app.listen(4320);