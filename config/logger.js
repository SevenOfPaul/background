import fs from "fs/promises"
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(import.meta.url);
//自定义打印函数
export default async function logger(level,logPath,message){
       let info=level=="log"? `<h3 style="color:blue">${new Date()}<br/>${message}<h3/><br/>`:`<h2 style="color:red">${message}<h2/><hr/>`;
        await fs.appendFile(path.join(__dirname,logPath), info);
        return true
}