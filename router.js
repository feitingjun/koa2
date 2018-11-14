import router from "koa-router";
import Home from "./routes/home/home";
import Index from "./routes/index";
import Login from "./routes/login/index";
import User from "./routes/user/index";
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

routes.use("/home",Home.routes(),Home.allowedMethods());
routes.use("/index",Index.routes(),Index.allowedMethods());
routes.use("/login",Login.routes(),Login.allowedMethods());
routes.use("/user",User.routes(),User.allowedMethods());

routes.use("*",async (ctx,next) => {
    ctx.response.type = "application/json";//返回格式
    if(!ctx.url || ctx.url === "/"){
        res.redirect("/index.html");//重定向
    }
    next();
})
export default routes;