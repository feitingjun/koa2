import Sequelize from "sequelize";
import moment  from "moment";
import config from "./sqlconfig";
// const sequelize = new Sequelize('sqlite:/home/archermind/Documents/SQLite/dbname.db')
const sequelize = new Sequelize(config.database,config.username,config.password, {
    host:config.host,
    port:config.port,
    dialect:"mysql",
    timezone: '+08:00',//时区
    operatorsAliases:{},
    pool:{
        max:5,//连接池中最大连接数量
        min:0,//连接池中最小连接数量
        idle:30000//线程最大响应时间
    }
})
const Users = sequelize.define("users",{
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
                Users.find({where:{email:email}})
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
                Users.find({where:{username:username}})
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
        get(){
            return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updateTime:{
        type:Sequelize.DATE,
        allowNull:false,//非空
        get(){
            return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss');
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
        }
    }
})
sequelize.sync();//同步模型到数据库，也就是没有表的就创建表
export { Users };