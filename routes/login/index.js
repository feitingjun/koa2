import fs from "fs";
import path from "path";
import Router from "koa-router";
import { Users } from "../../schema";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import uuid from "node-uuid";
import svgCaptcha from "svg-captcha";
import ejs from "ejs";
import Cache from "../../utils/cache";
import svgConvertBase64 from "../../utils/svgConvertBase64";

const emailTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../../template/verifymail.ejs'), 'utf8'));
const resultTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../../template/verifyresult.ejs'), 'utf8'));

const captchaCache = new Cache();
const emailCache = new Cache();
const successCache = new Cache();

const routes = Router();


//登陆
routes.post("/",async (ctx,next) => {
    next();
    let { username, password } = ctx.request.body;
    const user = await Users.findOne({where:{username:username}});
    if(!user) return ctx.body = {error:"用户不存在"};
    if(user.password != password) return ctx.body = {error:"密码错误"};
    const token = jwt.sign(user.dataValues,"token",{expiresIn: "1h"})
    ctx.body = {data:user,success:"登录成功",token: token};
})


//注册
routes.post("/registered",async (ctx,next) => {
    next();
    // let username = ctx.request.body.username;
    // let password = ctx.request.body.password;
    const user = await Users.create(ctx.request.body)
    ctx.body = {data:user,success:"注册成功"}
})


//发送验证邮件
routes.post("/sendemail",async (ctx,next) => {
    next();
    const { email, verificationCode,appId } = ctx.request.body;
    const user = await Users.findOne({where:{email:email}});
    if(user) return ctx.body = {error:"该邮箱已被注册"};
    if(!captchaCache.get(appId)){
        ctx.body = {data:null,error:"验证码已过期"}
        return false;
    }else {
        if(captchaCache.get(appId).toLowerCase() != verificationCode.toLowerCase()){
            ctx.body = {data:null,error:"验证码错误"}
            return false;
        }
    }
    const verifyId = uuid.v4();
    emailCache.set(appId,verifyId,300);
    const html = emailTemplate({
        appId: appId,
        verifyId: verifyId,
        IPorProt: IPorProt
    });
      
    const transporter = nodemailer.createTransport({
        service: "qq",
        auth: {
            user: "1334551386@qq.com",
            pass: "nxfofngecdgnhdha" //授权码,通过QQ获取
        }
    })
    var mailOptions = {
        from: "1334551386@qq.com", // 发送者
        to: email, // 接受者,可以同时发送多个,以逗号隔开
        subject: "验证邮件", // 标题
        //text: "Hello world", // 文本
        html: html
    }
    const info = await new Promise((resolve, reject)=>{
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                reject(err)
              return;
            }
            resolve(info)
            console.log("发送成功");
        });
    })
    ctx.socket.on("connection",()=>{
        console.log(11111111111)
    })
    ctx.body = {data:null,success:"已发送"}
})

//验证确认
routes.get("/confirmed",async (ctx,next) => {//:name表示在url中这个位置的值是变量
    next();
    const { appId,verifyId } = ctx.request.query;
    let isSuccess = true;
    if(emailCache.get(appId) != verifyId) isSuccess = false;
    if(isSuccess){
        emailCache.del(appId);
        successCache.set(appId,"success",1800);
        let socketId = globalCache.get(appId);
        io.to(socketId).emit("confirmedFinish");
    };

    const html = resultTemplate({
        isSuccess: isSuccess,
        IPorProt: IPorProt
    });
    ctx.response.type = "text/html";
    ctx.body = html;
})

//获取验证码
routes.post("/getCaptcha",async (ctx,next) => {
    let appId;
    if(ctx.request.body.appId){
        appId = ctx.request.body.appId;
    }else{
        appId = uuid.v4();
    }
    next();
    let captcha = svgCaptcha.create({ 
        // 字体大小 
        fontSize: 33, 
        // 噪声线条数 
        noise: 2, 
        // 宽度 
        width: 80, 
        // 高度 
        height: 38, 
        // color: true,
        // background: '#ccc'
    }); 
    const imgbase64 = await svgConvertBase64(captcha.data);
    captchaCache.set(appId,captcha.text,300);
    ctx.body = {
        data: {
            imgbase64,
            appId
        },
        success: "执行成功"
    }
})
export default routes;