import logger from "../config/logger.js";
export default async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        await logger("error","../../log/background.md",err);
        ctx.body = {
		status:200,
           data:{
			  code:501,
			  message:err.message==""?`服务器出现问题，请联系管理员重试<br/>`:err.message
		   }
        };
    }
}