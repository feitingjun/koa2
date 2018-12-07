import Sequelize from "sequelize";
import moment  from "moment";
const Schema = (sequelize) =>  {
    const schema = sequelize.define('friends',{
        id:{
            type:Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4,//默认值(有UUIDV4和UUIDV1)
            primaryKey:true//是否为主键
        },
        userId:{
            type:Sequelize.STRING,
            allowNull:false,//非空
        },
        friendId:{
            type:Sequelize.STRING,
            allowNull:false,//非空
        },
        remark:{
            type:Sequelize.STRING,
        },
        groupId:{
            type:Sequelize.STRING,
        },
        message:{
            type:Sequelize.STRING,
        },
        status:{
            type: Sequelize.BOOLEAN,
            defaultValue: 0 //  0为待验证，1为通过，2为未通过，3为拉黑，4为删除
        },
        apply:{
            type: Sequelize.BOOLEAN,
            defaultValue: true 
        },
        createTime:{
            type:Sequelize.DATE,
            allowNull:false,//非空
            set(){
                return moment(this.setDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updateTime:{
            type:Sequelize.DATE,
            allowNull:false,//非空
            set(){
                return moment(this.setDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },{
        createdAt:"createTime",//替换createdAt的字段名
        updatedAt:"updateTime",//替换updatedAt的字段名
    })
    return schema;
}
export default Schema;