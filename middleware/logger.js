import path from "path";
import logger from "../config/logger.js";
export default async  function (ctx, next) {
    await logger("log",path.join("../../log/background.md"),`
    路径：${ctx.url}
    <br/>
    header:${JSON.stringify(ctx.header)}`);
     await next();
}