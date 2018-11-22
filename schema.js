import Sequelize from "sequelize";
import moment  from "moment";
import fs from "fs";
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

const files = fs.readdirSync('./schemas')
files.map((v,i) => {
    const schema  = require(`./schemas/${v}`).default(sequelize);
    const schemaName = v.substr(0,v.indexOf('.'));
    module.exports[schemaName] = schema;
})

sequelize.sync();//同步模型到数据库，也就是没有表的就创建表
module.exports.sequelize = sequelize;