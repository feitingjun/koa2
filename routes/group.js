import Router from "koa-router";
import { sequelize,Users,Friends,Groups } from "../schema";
import Sequelize from "sequelize";
import jwt from "jwt-simple";
import { updateFriendList } from '../sockets/group';

const Op = Sequelize.Op
const routes = Router();

//新增分组
routes.post("/",async (ctx,next) => {
    next();
    const { userId,groupName } = ctx.request.body;
    const data = await Groups.create(ctx.request.body);
    const groups = await Groups.findAll({where: {userId: userId}}); 
    ctx.body = {data: groups,success:"创建成功"}
    updateFriendList(userId)
})

//修改分组
routes.put("/",async (ctx,next) => {
    next();
    const { id,userId } = ctx.request.body;
    let body = ctx.request.body;
    delete body.id;
    delete body.userId;
    const data = await Groups.update(body,{where:{id: id}});
    ctx.body = {data: data,success: '修改成功'};
    updateFriendList(userId);
})

//删除分组
routes.delete("/",async (ctx,next) => {
    next();
    const { id } = ctx.request.body;
    const group = await Groups.findOne({where:{id:id}});
    const defaultGroup = await Groups.findOne({where:{userId:group.userId,isDefault:1}});
    await Friends.update({
        groupId: defaultGroup.id
    },{
        where:{
            groupId: group.id
        }
    })
    await Groups.destroy({where:{id:id}});
    const groups = await Groups.findAll({where:{userId:defaultGroup.userId}})
    ctx.body = {data:groups,success:"删除成功"}
    updateFriendList(defaultGroup.userId);
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
            select * from koa.users, koa.friends where users.id = friends.friendId and status = 1 and groupId = '${v.id}'
        `,{ type: sequelize.QueryTypes.SELECT })
        return v.dataValues
    })
    
    ctx.body = {data: data,success:"查询成功"}
})

export default routes;