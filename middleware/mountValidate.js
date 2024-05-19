export default (validates)=>{
    return async(ctx,next)=>{
        const mount=ctx.method=="GET"?ctx.params:ctx.request.body;
        for(let key in validates){
         if(!validates[key]||!validates[key](mount[key])) throw new Error("数据格式错误")
        }
     await next();
    }
}