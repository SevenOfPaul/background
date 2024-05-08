import Router  from 'koa-router'; 

import odor from "./odor.js"
const router = new Router();

//挂栽路由

router.use("/odor",odor.routes())
export default router