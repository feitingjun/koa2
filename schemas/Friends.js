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
        userRemark:{
            type:Sequelize.STRING,
        },
        friendRemark:{
            type:Sequelize.STRING,
        },
        userGroupId:{
            type:Sequelize.STRING,
        },
        friendGroupId:{
            type:Sequelize.STRING,
        },
        status:{
            type: Sequelize.BOOLEAN
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