import Router from "koa-router";
import { Users } from "../../schema";
import Cache from '../../utils/cache';


const routes = Router();
routes.post("/",async (ctx,next) => {
    next();
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    const user = await Users.create({username,password,email:`${username}@qq.com`});
    ctx.body = {success:"注册成功"};
})
routes.get("/",async (ctx,next) => {
    next();
    ctx.response.type = "text/html";
    ctx.response.body = `
    <form action="/home" method="post">
        姓名:<input name="username" /><br/>
        密码:<input name="password" type="password" /><br/>
        <input type="submit" value="提交" />
    </form>
    `
})
export default routes;