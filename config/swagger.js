import Router  from 'koa-router'; 
import swaggerJSDoc from 'swagger-jsdoc';
//esm模块下的filename
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
import * as path from 'path'
const swaggerDefinition = {
    info: {
        title: '英语书接口文档',
        version: '0.0.1',
        description: 'API',
    },
    host: 'localhost:4321',
    basePath: '/' // Base path (optional)
};
// 通过路由获取生成的注解文件
const options = {
    swaggerDefinition,
    apis: [path.join(__filename,"../../router/*.js")], //配置路由router文件的位置
};
const swaggerSpec = swaggerJSDoc(options)


 export default Router().get('/api.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})