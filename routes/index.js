
import Router from "koa-router";
const routes = Router();
routes.get("/",async (ctx,next) => {
    next();
    ctx.response.body = `1111111111111`
})

routes.get("/query",async (ctx,next) => {
    next();
    let id = ctx.request.query.id;
    ctx.response.body = "query" + id;
})

routes.get("/home/:name/aa",async (ctx,next) => {//:name表示在url中这个位置的值是变量
    next();
    let name = ctx.params.name;//通过params可以取出url中的变量，变量变为“:”后面的名称
    ctx.response.body = "home" + name;
})

export default routes;