import router from "koa-router";
import Home from "./routes/home/home";
import Index from "./routes/index";
const routes = new router();


routes.use("/home",Home.routes(),Home.allowedMethods());
routes.use("/index",Index.routes(),Index.allowedMethods());

routes.use("*",async (ctx,next) => {
    ctx.response.type = "application/json";//返回格式
    if(!ctx.url || ctx.url === "/"){
        res.redirect("/index.html");//重定向
    }
    next();
})

routes.post("/api/login",async (ctx,next) => {
    ctx.response.body={      //将请求json格式返回
        success:"登陆成功",
        data: {
            user:{
                id:"1",
                username:"张三",
                menu:[]
            }
        }
    }
    next();
})
export default routes;