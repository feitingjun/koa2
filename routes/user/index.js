import Router from "koa-router";
import { Users } from "../../schema";
const jwt = require('jwt-simple')

const routes = Router();
routes.get("/info",async (ctx,next) => {
    next();
    const token = ctx.header.authorization;
    let payload = jwt.decode(token.split(' ')[1], 'token');
    let id = payload.id;
    const user = await Users.findOne({where:{id:id}});
    if(!user) return ctx.body = {error:"用户不存在"};
    ctx.body = {data:user,success:"获取用户信息成功"};
})
routes.delete("/",async (ctx,next) => {
    await next();
    let id = ctx.request.body.id;
    const user = await Users.destroy({ where: { id: id} })
    ctx.body = {data:user,success:"删除成功"};
})
export default routes;