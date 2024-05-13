import Router  from 'koa-router'; 
import book from "./book.js"
import odor from "./odor.js"
import search from "./search.js"
import transform from "./transform.js"
const router = new Router();
//挂载路由

router.use("/odor",odor.routes())
router.use("/book",book.routes())
router.use("/search",search.routes())
router.use("/transform",transform.routes())
export default router