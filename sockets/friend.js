import { sequelize,Users,Friends,Groups } from "../schema";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export const updateNewFriendList = async (id) => {
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
            userId:id
        }]
    }});
    const data = await friends._map(async (v,i) => {
        v.dataValues.user = await Users.findOne({where:{id: v.userId == id ? v.friendId : v.userId }});
        return v.dataValues
    })
    const socketId = globalCache.get(id);
    if(socketId){
        io.to(socketId).emit("updateNewFriendList",data);
    }
}

export const updateFriendRequestMsg = async (id) => {
    const data = await Friends.findOne({where:{id: id}})
    const user = await Users.findOne({where:{id: data.userId}});
    data.dataValues.user = user;
    const socketId = globalCache.get(data.friendId);
    if(socketId){
        io.to(socketId).emit("updateFriendRequestMsg",data);
    }
}