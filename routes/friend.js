import Router from "koa-router";
import { sequelize,Users,Friends,Groups } from "../schema";
import Sequelize from "sequelize";
import jwt from "jwt-simple";
import { updateFriendList } from '../sockets/group';
import { updateNewFriendList,updateFriendRequestMsg } from '../sockets/friend';

const Op = Sequelize.Op

const routes = Router();

//添加好友
routes.post("/",async (ctx,next) => {
    next();
    const { userId,friendId } = ctx.request.body;
    const friend = await Friends.findOne({
        where:{
            [Op.or]:[{
                userId: userId,friendId: friendId 
            },{
                userId: friendId,friendId: userId
            }] 
        } 
    })
    if(friend){
        await Friends.update(ctx.request.body,{where:{id: friend.id}})
    }else{
        await Friends.create(ctx.request.body)
    }
    ctx.body = {data: null,success:"执行成功"}
    updateNewFriendList(userId);
    updateNewFriendList(friendId);
})

//拒绝好友
routes.post("/refuse",async (ctx,next) =>{
    next();
    const { id } = ctx.request.body;
    await Friends.update(ctx.request.body,{where:{id: id}});
    const data = await Friends.findOne({where: {id: id}});
    const user = await Users.findOne({where:{id: data.userId}});
    data.dataValues.user = user;
    ctx.body = {data: data, success:'更新成功'}
    updateFriendList(data.userId);
    updateFriendList(data.friendId);
    updateNewFriendList(data.userId);
    updateNewFriendList(data.friendId);
    // updateFriendRequestMsg(id);
})

//更新好友
routes.put("/",async (ctx,next) =>{
    next();
    const { id } = ctx.request.body;
    await Friends.update(ctx.request.body,{where:{id: id}});
    const data = await sequelize.query(`
        select * from koa.users,koa.friends,koa.groups where groups.id = friends.groupId and friends.id = '${id}'  and users.id = friends.friendId
    `,{ model: Users })
    ctx.body = {data: data[0], success:'更新成功'}
    updateFriendList(data[0].dataValues.userId);
})

//删除好友
routes.delete("/",async (ctx, next) => {
    next();
    const { userId,friendId } = ctx.request.body;
    const data = await Friends.destroy({
        where: {
            [Op.or]:[{
                userId: userId,
                friendId: friendId
            },{
                userId: friendId,
                friendId: userId
            }]
        }
    })
    ctx.body = {success: '删除成功'};
    updateFriendList(userId);
    updateFriendList(friendId);
    updateNewFriendList(userId);
    updateNewFriendList(friendId);
})

//获取好友请求
routes.get("/getFriendQuery",async (ctx,next) => {
    next();
    const { id } = ctx.request.query;
    const friends = await Friends.findAll({where:{
        status:{
            [Op.notIn]: [3, 4],
        },
        apply:{
            [Op.notIn]: [0],
        },
        [Op.or]:[{
            friendId: id
        },{
            userId:id,
        }]
    },
        order:[['createTime', 'DESC']]
    });
    const data = await friends._map(async (v,i) => {
        v.dataValues.user = await Users.findOne({where:{id: v.userId == id ? v.friendId : v.userId }});
        return v.dataValues
    })
    ctx.body = {data:data,success:'查询成功'}
})

routes.post("/agree", async (ctx,next) => {
    next();
    const { id } = ctx.request.body;
    let body = ctx.request.body;
    body.apply = false;
    delete body.id;
    await Friends.update({status: 1},{where:{id: id}});
    const data = await Friends.create(body);
    ctx.body = {data:data, success:"添加成功"};
    updateFriendList(data.userId);
    updateFriendList(data.friendId);
    updateNewFriendList(data.userId);
    updateNewFriendList(data.friendId);
    updateFriendRequestMsg(id);
})

//获取好友信息
routes.get("/info", async (ctx,next) => {
    next();
    const { id,userId } = ctx.request.query;
    const data = await sequelize.query(`
        select * from koa.users,koa.groups,koa.friends where groups.id = friends.groupId and friends.userId = '${id}' and friends.friendId = '${userId}' and users.id = '${userId}'
    `,{ model: Users })
    ctx.body = {data: data[0],success:"查询成功"}
})
export default routes;