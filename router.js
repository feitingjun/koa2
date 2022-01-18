import router from "koa-router";
import fs from "fs";
import koajwt from "koa-jwt";

const routes = new router();

//需要放在router最前面
routes.use(async (ctx,next) => {
    return next().catch((err) => {
        if(err.status === 401) {
            throw new Error("登录验证无效,请重新登录")
        } else {
            throw err
        }
    })
})
routes.use(koajwt({
    secret: "token"
}).unless({
    path: [/^\/login/]
}))

const files = fs.readdirSync('./routes')
files.map((v,i) => {
    const file  = require(`./routes/${v}`).default;
    const fileName = v.substr(0,v.indexOf('.'));
    routes.use(`/${fileName}`,file.routes(),file.allowedMethods());
})

routes.use("*",async (ctx,next) => {
    ctx.response.type = "application/json";//返回格式
    if(!ctx.url || ctx.url === "/"){
        res.redirect("/index.html");//重定向
    }
    next();
})
export default routes;