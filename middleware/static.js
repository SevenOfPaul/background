import path from "node:path"
import validator from "validator"
import fs from "node:fs"
import { fileURLToPath } from "url";
import mime from "mime-types"
const __filename = path.dirname(fileURLToPath(import.meta.url));
export default async function (ctx, next) {
    if (validator.matches(ctx.request.url, /^\/public/)) {
        const filePath = path.join(__filename, `../${ctx.request.url}`);
        console.log(filePath);
        if (fs.existsSync(filePath)) {
          ctx.type=mime.lookup(filePath)
            ctx.body = fs.createReadStream(filePath)
        }else{
            throw new Error("目标文件不存在")
        }
    }else{
        await next();
    }
    
}