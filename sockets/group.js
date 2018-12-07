import { sequelize,Users,Friends,Groups } from "../schema";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export const updateFriendList = async (id) => {
    const groups = await Groups.findAll({where:{userId: id}});
    const data = await groups._map(async (v,i) => {
        // v.dataValues.friends = await sequelize.query(`
        //     select a.*,b.* from (
        //         select id as correlationId,friendId as id,userRemark  as remark,createTime,updateTime from koa.friends where status='1' and userGroupId='${v.id}'
        //         union
        //         select id as correlationId,userId as id,friendRemark  as remark,createTime,updateTime from koa.friends where status='1' and friendGroupId='${v.id}'
        //     )
        //     a inner join koa.users b on a.id=b.id
        // `,{ type: sequelize.QueryTypes.SELECT })
        v.dataValues.friends = await sequelize.query(`
            select * from koa.users, koa.friends where users.id = friends.friendId and status = 1 and groupId = '${v.id}'
        `,{ type: sequelize.QueryTypes.SELECT })
        return v.dataValues
    })
    const socketId = globalCache.get(id);
    if(socketId){
        io.to(socketId).emit("updateFriendList",data);
    }
}