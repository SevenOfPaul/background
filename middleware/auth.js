export default function(paths){
    return async function(ctx,next){
        ctx.header.authorization= ctx.header.authorization?ctx.header.authorization=ctx.header.authorization.split(" ")[1]:undefined;
        if(paths.some(p=>ctx.url.match(p))&&ctx.header.authorization){
            ctx.body={
                status:"200",
                code:401,
                message:"请先登录，未获得账号相关信息"
            }
            return
        }
         await next();
    }
}