import nodemailer from "nodemailer"
global.emailRedis=new Map();
// 使用async..await 创建执行函数
const transporter=nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secureConnection:true,
    secure:false,
    auth: {
        user: "3167385363@qq.com", // 发送方邮箱的账号
        pass: "anunnhwusmbnddid", // 邮箱授权密码
      },
})
async function sendMail(transporter,email,code){
    const info = await transporter.sendMail({
        from: "3167385363@qq.com", // 发送方邮箱的账号
        to: email, // 邮箱接受者的账号
        subject: "Hello Dooring", // Subject line
        html: `欢迎注册englishBook, 您的邮箱验证码是:<b><br/>${code}</b><br/>60秒后过期`, // html 内容, 如果设置了html内容, 将忽略text内容
      });
}
async function verifyMail(){
    
}
export {transporter,sendMail,verifyMail}