import Router from 'koa-router';
const router = new Router();
import maxFile from '../middleware/maxFile.js';
import { transporter, sendMail } from "../config/foxMail.js"
import { nanoid } from 'nanoid';
import User from '../database/user.js';
import Book from "../database/book.js";
import UserBook from "../database/userBook.js"
import validator from 'validator';
import path from "node:path";
import { fileURLToPath } from "url";
import generateToken from "../hooks/generateToken.js";
const __filename = path.dirname(fileURLToPath(import.meta.url));
import config from "../config/config.json" assert {type:"json"};
import jwt from "jsonwebtoken";
router.post("/sendMail", async (ctx) => {
    const { email } = ctx.request.body;
        //验证数据
    if (!validator.isEmail(email)) throw new Error("数据格式错误");
    if(await User.find({email}).length){ ctx.body = {status: "200",data: { code: 303,message: "该邮箱已注册"}};return}
    const verifyCode = nanoid();
    global.emailRedis.set(email, { verifyCode, time: new Date().getTime() });
    await sendMail(transporter, email, `${verifyCode}`);
    ctx.body = {
        status: "200",
        data: {
            code: 200,
            verify: verifyCode,
            message: "已发送至邮箱"
        }
    }
})
router.post("/verify", async (ctx) => {
    const { email, verifyCode, name, password,pic } = ctx.request.body;
       //验证数据
      //验证邮箱
    const res = global.emailRedis.get(email);
    console.log(email, verifyCode, name, password,global.emailRedis,res )
    if (res&&res.verifyCode == verifyCode && new Date().getTime() - res.time <= 60 * 1000) {
        const filePath = path.join(__filename, pic?pic:"../public/pictures/users/default.jpg");
        const user = new User({ email, name, password,pic:filePath });
        console.log(user)
        //存生词本
        const book=new Book({name:"生词本"});
        const userBook=new UserBook({bookId:book._id,userId:user._id});
        await userBook.save();
        await book.save();
        await user.save();
        global.emailRedis.delete(email);
        ctx.body = {
            status: "200",
            data: {
                code: 200,
                token:generateToken({email,userId:user._id}),
                message: "注册成功"
            }
        }
        return
    }
    //-------------------
    ctx.body = {
        status: "200",
        data: {
            code: 302,
            message: "验证码错误"
        }
    }

})
router.post("/login", async (ctx) => {
    //需要修改
    if(ctx.headers.authorization) throw new Error("无需重新登陆");
    const {email,password}=ctx.request.body;
    if (!validator.isEmail(email)) throw new Error("数据格式错误");
    const user=await User.find({email});
    console.log(user)
      if(password==await user[0].password){
        //登陆成功
        ctx.body = {
            status: "200",
            data: {
                code: 200,
                token:generateToken({email,userId:user[0]._id}),
                message: "登陆成功"
            }
        }
        return
      }else{
        ctx.body = {
            status: "200",
            data: {
                code: 302,
                message: "密码错误"
            }
        }
      }
})
router.post("/addPic", maxFile(512 * 512), async (ctx) => {
    //userId从jwt中获取
    const userId=jwt.verify(ctx.headers.authorization,config.secret);
    const { pic } = ctx.request.files;
    const fileReader = fs.createReadStream(pic.filepath);
    const filePath = `${path.join(__filename, "../public/pictures/users/")}${nanoid()}.jpg`;
    const fileHandler = fs.createWriteStream(filePath);
    Book, updateOne({ _id: userId }, { pic: filePath });
    //把读流中的数据写入到写流中
    fileReader.pipe(fileHandler);
    ctx.body = {
        status: "200",
        data: { code: 200, message: "封面添加成功", filePath }
    }
})
router.post("/changePassword", async (ctx) => {
    //userId,email从jwt中获取
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const { password } = ctx.request.body;
    if (res.verifyCode == verifyCode && new Date().getTime() - res.time <= 60 * 1000) {
       await Book.updateOne({ _id: userId }, { password });
        ctx.body = {
            status: "200",
            data: { code: 200, message: "密码修改成功" }
        }
        return
    } else {
        ctx.body = {
            status: "200",
            data: {
                code: 302,
                message: "验证码错误"
            }
        }
    }
})
router.get("/getProfile", async (ctx) => {
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const data= await User.findById(userId,{_id:1,name:1,crate_at:1,email:1,pic:1});
    ctx.body = {
        status: "200",
        data: { code: 200, data }
    }
})
router.post("/changeProfile", async (ctx) => {
    //userId从jwt中获取
    const {userId}=jwt.verify(ctx.headers.authorization,config.secret);
    const { name, pic } = ctx.request.body;
   await Book.updateOne({ _id: userId }, { name, pic });
   console.log(ctx.response);
    ctx.body = {
        status: "200",
        data: { code: 200, message: "信息修改成功" }
    }
})
export default router;