import fs from "fs";
import path from "path";
import Router from "koa-router";
import { Users,Groups } from "../schema";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import uuid from "node-uuid";
import svgCaptcha from "svg-captcha";
import ejs from "ejs";
import Cache from "../utils/cache";
import svgConvertBase64 from "../utils/svgConvertBase64";

const emailTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../template/verifymail.ejs'), 'utf8'));
const resultTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../template/verifyresult.ejs'), 'utf8'));

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

//发送验证邮件
routes.post("/sendemail",async (ctx,next) => {
    next();
    const { email, verificationCode,appId } = ctx.request.body;
    const user = await Users.findOne({where:{email:email}});
    // if(user) return ctx.body = {error:"该邮箱已被注册"};
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
        IPorProt: IPorProt,
        email: email,
        isShowLink: true
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
    ctx.body = {data:null,success:"已发送"}
})

//验证模板
routes.get("/emailverify",async (ctx,next) => {//:name表示在url中这个位置的值是变量
    next();
    const { email,appId,verifyId } = ctx.request.query;
    const html = emailTemplate({
        appId: appId,
        verifyId: verifyId,
        IPorProt: IPorProt,
        email: email,
        isShowLink: false
    });
    ctx.response.type = "text/html";
    ctx.body = html;
})

//验证确认
routes.get("/confirmed",async (ctx,next) => {//:name表示在url中这个位置的值是变量
    next();
    const { appId,verifyId } = ctx.request.query;
    let isSuccess = true;
    if(emailCache.get(appId) != verifyId) isSuccess = false;
    if(isSuccess){
        emailCache.del(appId);
        successCache.set(appId,"success",300);
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

//获取验证结果
routes.get("/getVerifyResult",async (ctx,next) => {
    next();
    const { appId } = ctx.request.query;
    if(successCache.get(appId) && !emailCache.get(appId)) return ctx.body = {success:"验证成功"};
    ctx.body = {error:"您还未完成验证"}
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
//注册用户
routes.post("/register",async (ctx,next) => {
    next();
    const user = await Users.create(ctx.request.body);
    const group = await Groups.create({userId:user.id,groupName:'我的好友',isDefault: 1});
    ctx.body = {data:user,success:"注册成功"};
})
export default routes;