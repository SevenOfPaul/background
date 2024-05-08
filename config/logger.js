import fs from "fs/promises"
import * as path from "path";
import { AbstractLogger } from "typeorm"
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(import.meta.url);
const logPath = path.join(__dirname, "../../log/log.md")

export class MyLogger extends AbstractLogger {
    async writeLog(level, message, queryRunner) {
       let info=level==""? `<h3 style="color:blue">${message}<h3/><hr/>`:`<h2 style="color:red">${message}<h2/><hr/>`
        await fs.appendFile(logPath, info);
    }
}