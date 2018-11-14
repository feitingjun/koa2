import Sequelize from "sequelize";
import moment  from "moment";

const Schema = (sequelize) =>  {
    const schema =  sequelize.define('users',{
        id:{
            type:Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4,//默认值(有UUIDV4和UUIDV1)
            primaryKey:true//是否为主键
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,//非空
            unique:true,//唯一
            primaryKey:true,//是否为主键
            validate:{
                is:{args:["^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"],msg:"邮箱格式错误"},
                isUnique:(email,next)=>{
                    schema.find({where:{email:email}})
                    .done((user)=>{
                        if(user){
                            next("该邮箱已被注册");//next传值则进入错误，不传正确
                        }else{
                            next();
                        }
                        
                    })
                }
            }
        },
        username:{
            type:Sequelize.STRING,
            allowNull:false,//非空
            unique:true,//唯一
            primaryKey:true,//是否为主键
            validate:{
                len:{args:[6,18],msg:"用户名长度必须在6到18个字符之间"},
                is:{args:["^[a-zA-Z][a-zA-Z0-9_]*$"],msg:"用户名格式错误"},
                isUnique:(username,next)=>{
                    schema.find({where:{username:username}})
                    .done((user)=>{
                        if(user){
                            next("用户已存在");//next传值则进入错误，不传正确
                        }else{
                            next();
                        }
                        
                    })
                }
            }
        },
        name:{
            type:Sequelize.STRING,
            allowNull:true//非空
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,//非空
            len:{args:[6,18],msg:"密码必须在6到18个字符之间"}
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
        // timestamps: false,//不使用数据库自动提供的createdAt(创建时间)和updatedAt(更新时间)字段
        createdAt:"createTime",//替换createdAt的字段名
        updatedAt:"updateTime",//替换updatedAt的字段名
        validate:{
            bothCoordsOrNone: function() {
                if (!this.username) throw new Error("用户名不能为空");
                if (!this.password) throw new Error("密码不能为空");
                if (!this.email) throw new Error("邮箱不能为空");
            }
        }
    })
    return schema;
}

export default Schema;