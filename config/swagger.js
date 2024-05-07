
import Router  from 'koa-router'; 
import swaggerJSDoc from 'swagger-jsdoc';
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
const options = {
    swaggerDefinition,
    apis: [path.join( '../router/*.js')], //配置路由router文件的位置
};
const swaggerSpec = swaggerJSDoc({swaggerDefinition,apis:[]})
// 通过路由获取生成的注解文件

 export default Router().get('/api.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})