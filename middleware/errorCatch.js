import logger from "../config/logger.js";
export default async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        await logger("error","../../log/background.md",err);
        ctx.body = {
           code:501,
           message:err.message==""?`服务器出现问题，请联系管理员重试<br/>`:err.message
        };
    }
}