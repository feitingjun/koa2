import Router from "koa-router";
import { sequelize,Users,Friends,Groups } from "../schema";
import Sequelize from "sequelize";
import jwt from "jwt-simple";
const Op = Sequelize.Op

const routes = Router();

//新增分组
routes.post("/addGroup",async (ctx,next) => {
    next();
    const { userId,groupName } = ctx.request.body;
    const data = await Groups.create(ctx.request.body);
    const groups = await Groups.findAll({where: {userId: userId}}); 
    ctx.body = {data: groups,success:"创建成功"}
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
export default routes;