import Router from "koa-router";
import { Users,Groups } from "../../schema.js";
import Cache from '../../utils/cache';

const routes = Router();
routes.post("/",async (ctx,next) => {
    next();
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log(Users)
    const user = await Users.create({username,password,email:`${username}@qq.com`});
    const group = await Groups.create({userId:user.id,groupName:'我的好友'});
    ctx.body = {data:user,success:"注册成功"};
})
routes.get("/",async (ctx,next) => {
    next();
    ctx.response.type = "text/html";
    ctx.response.body = `
    <form action="/user/getFriensList" method="post">
        姓名:<input name="message" /><br/>
        密码:<input name="password" type="password" /><br/>
        <input type="submit" value="提交" />
    </form>
    `
})
export default routes;