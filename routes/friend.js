import Router from "koa-router";
import { sequelize,Users,Friends,Groups } from "../schema";
import Sequelize from "sequelize";
import jwt from "jwt-simple";
const Op = Sequelize.Op

const routes = Router();

//添加好友
routes.post("/",async (ctx,next) => {
    const { userId,friendId } = ctx.request.body;
    next();
    const friend = await Friends.findOne({
        where:{
            [Op.or]:[{
                userId: userId,
                friendId: friendId
            },{
                userId: friendId,
                friendId: userId
            }]
        }
    })
    if(friend){
        let status = friend.status;
        if(friend.status != 1 || friend.status != 3) status = 0;
        await Friends.update(ctx.request.body,{where:{id: friend.id,status: status}})
    }else{
        await Friends.create(ctx.request.body)
    }
    ctx.body = {data: null,success:"执行成功"}
})

//获取好友请求
routes.get("/getFriendQuery",async (ctx,next) => {
    next();
    const { id } = ctx.request.query;
    const friends = await Friends.findAll({where:{
        [Op.or]:[{
            friendId: id
        },{
            userId:id
        }]
    }});
    const data = await friends._map(async (v,i) => {
        v.dataValues.user = await Users.findOne({where:{id: v.userId == id ? v.friendId : v.userId }});
        return v.dataValues
    })
    ctx.body = {data:data,success:'查询成功'}
})
export default routes;