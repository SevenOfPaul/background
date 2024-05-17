export default function(maxSize){
    return async function (ctx, next) {
        for(let fileName in ctx.request.files){
            if(ctx.request.files[fileName].size>maxSize) throw new Error("上传文件过大，无法录入");
         }
         await next();
        }
        
}