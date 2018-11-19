import Router from "koa-router";
import { sequelize,Users,Friends,Groups } from "../../schema";
import Sequelize from "sequelize";
import jwt from "jwt-simple";
const Op = Sequelize.Op

const routes = Router();

//根据token获取当前登录用户信息
routes.get("/info",async (ctx,next) => {
    next();
    const token = ctx.header.authorization;
    let payload = jwt.decode(token.split(' ')[1], 'token');
    let id = payload.id;
    const user = await Users.findOne({where:{id:id}});
    if(!user) return ctx.body = {error:"用户不存在"};
    ctx.body = {data:user,success:"获取用户信息成功"};
})

//根据id获取用户详情
routes.get("/getDetails",async (ctx,next) => {
    next();
    let id = ctx.request.query.id;
    const user = await Users.findOne({where:{id:id}});
    if(!user) return ctx.body = {error:"用户不存在"};
    ctx.body = {data:user,success:"获取用户信息成功"};
})

//删除用户
routes.delete("/",async (ctx,next) => {
    await next();
    let id = ctx.request.body.id;
    const user = await Users.destroy({ where: { id: id} })
    ctx.body = {data:user,success:"删除成功"};
})

//获取所有分组
routes.get("/getGroups",async (ctx,next) => {
    next();
    const { id } = ctx.request.query;
    const data = await Groups.findAll({where: {userId: id}});
    ctx.body = {data:data,success:"查询成功"}
})

//获取好友列表
routes.post("/getFriensList",async (ctx,next) => {
    next();
    const { id } = ctx.request.body;
    const groups = await Groups.findAll({where:{userId: id}});
    const data = await groups._map(async (v,i) => {
        v.dataValues.friends = await sequelize.query(`
            select a.*,b.* from (
                select id as correlationId,friendId as id,userRemark  as remark,createTime,updateTime from koa.friends where status='0' and userGroupId='${v.id}'
                union
                select id as correlationId,userId as id,friendRemark  as remark,createTime,updateTime from koa.friends where status='0' and friendGroupId='${v.id}'
            )
            a inner join koa.users b on a.id=b.id
        `,{ type: sequelize.QueryTypes.SELECT })
        return v.dataValues
    })
    
    ctx.body = {data: data,success:"查询成功"}
})

//搜索用户
routes.post("/searchUser",async (ctx,next) => {
    next();
    const { message } = ctx.request.body;
    const users = await Users.findAll({
        where:{
            [Op.or]: [{
                // username:{[Op.regexp]: message} //传空会报错
                username:{[Op.like]:`%${message}%`}  //传空查询所有
            },{
                // name:{[Op.regexp]: message}
                name:{[Op.like]:`%${message}%`}
            },{
                // email:{[Op.regexp]: message}
                email:{[Op.like]:`%${message}%`}
            }]
        }
    })
    ctx.body = {data: users,success: "查询成功"}
})
//select a.*,b.* from (select *,friendId as needId from koa.friends where userGroupId='6c4e23aa-a3e3-4790-bce5-072cabcdfbc2' union select *,userId as needId from koa.friends where friendGroupId='6c4e23aa-a3e3-4790-bce5-072cabcdfbc2') a inner join koa.users b on a.needId=b.id
export default routes;