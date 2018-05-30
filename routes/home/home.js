import Router from "koa-router";
import { Users } from "../../schema";
const routes = Router();
routes.post("/",async (ctx,next) => {
    next();
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    // const user = await Users.create({
    //     username:username,
    //     password:password,
    // })
    // ctx.body = {data:user,message:"用户创建成功"}
    const user = await Users.findOne({where:{username:username}});
    if(!user) return ctx.body = {error:"用户不存在"};
    if(user.password != password) return ctx.body = {error:"密码错误"};
    ctx.body = {data:user,success:"查询成功"};
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