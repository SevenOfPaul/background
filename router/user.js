import Router from 'koa-router';
const router = new Router();
import maxFile from '../middleware/maxFile.js';
import { transporter, sendMail } from "../config/foxMail.js"
import { nanoid } from 'nanoid';
import User from '../database/user.js';
import Book from "../database/book.js";
import UserBook from "../database/userBook.js"
import validator from 'validator';
router.post("/sendMail", async (ctx) => {
    //验证数据
    const { email } = ctx.request.body;
    if (!validator.isEmail(email)) throw new Error("数据格式错误");
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
    const { email, verifyCode, name, password } = ctx.request.body;
       //验证数据
      //验证邮箱
    const res = global.emailRedis.get(email);
    if (res.verifyCode == verifyCode && new Date().getTime() - res.time <= 60 * 1000) {
        const filePath = path.join(__filename, "../public/pictures/users/default.jpg");
        const user = new User({ email, name, password,pic:filePath });
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
                message: "注册成功"
            }
        }
        return
    }
    ctx.body = {
        status: "200",
        data: {
            code: 302,
            message: "验证码错误"
        }
    }

})
router.post("/addPic", maxFile(512 * 512), async (ctx) => {
    //userI从jwt中获取
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
    const userId = "";
    const { password } = ctx.request.body;
    if (res.verifyCode == verifyCode && new Date().getTime() - res.time <= 60 * 1000) {
        Book, updateOne({ _id: userId }, { password });
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
router.post("/changeProfile", async (ctx) => {
    //userId从jwt中获取
    const userId = "";
    const { name, pic } = ctx.request.body;
    Book, updateOne({ _id: userId }, { name, pic });
    ctx.body = {
        status: "200",
        data: { code: 200, message: "信息修改成功" }
    }
})
export default router;