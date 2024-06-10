import  jwt from "jsonwebtoken";
import config from "../config/config.json" assert {type:"json"}
import generateToken from "../hooks/generateToken.js";
export default function(paths,freshPath){
    return async function(ctx,next){
        ctx.header.authorization= ctx.header.authorization?ctx.header.authorization=ctx.header.authorization.split(" ")[1]:undefined;
        if(paths.some(p=>ctx.url.match(p))&&!jwt.verify(ctx.header.authorization,config.secret)){
            ctx.body={
                status:"200",
                code:401,
                message:"请先登录，未获得账号相关信息"
            }
            return
        }
        if(freshPath.some(f=>ctx.url.match(f))){
            const {userId,email}=jwt.verify(ctx.header.authorization,config.secret);
             ctx.set("authorization",generateToken({userId,email},config.expiresIn));
        }
         await next();
    }
}