import logger from "./logger";
const error = (opts) => {
    return async (ctx,next) => {
        try {
            await next();
            if(typeof ctx.body == "object"){
                ctx.body.data = ctx.body.data ? ctx.body.data : null;
                if(ctx.body.success){
                    ctx.body.code = 200;
                    ctx.body.message = ctx.body.success;
                    delete ctx.body.success;
                }else{
                    ctx.body.code = 0;
                    ctx.body.message = null;
                    if(ctx.body.error){
                        ctx.body.message = ctx.body.error;
                        delete ctx.body.error;
                    }
                }
            }
        } catch (err) {
            let message = null;
            if(err.errors){
                message = `${err.errors.map(v=>v.message).join(",")}`;
            }else{
                switch(err.name){
                    case "SequelizeValidationError":
                        message = "验证失败";
                        break;
                    case "SequelizeDatabaseError":
                        message = "数据库错误";
                        break;
                    case "SequelizeTimeoutError":
                        message = "查询超时";
                        break;
                    case "SequelizeUniqueConstraintError":
                        message = "已存在";
                        break;
                    case "SequelizeExclusionConstraintError":
                        message = "排除约束错误";
                        break;
                    case "SequelizeForeignKeyConstraintError":
                        message = "外键约束错误";
                        break;
                    case "SequelizeConnectionError":
                        message = "连接数据库错误";
                        break;
                    case "SequelizeConnectionRefusedError":
                        message = "连接数据库被拒绝";
                        break;
                    case "SequelizeAccessDeniedError":
                        message = "没有权限访问数据库";
                        break;
                    case "SequelizeHostNotFoundError":
                        message = "未找到主机";
                        break;
                    case "SequelizeInvalidConnectionError":
                        message = "无效链接";
                        break;
                    case "SequelizeConnectionTimedOutError":
                        message = "链接数据库超时";
                        break;
                    case "SequelizeInstanceError":
                        message = "实例错误";
                        break;
                    default:
                        message = err.message;
                }
            }
            logger.error(message);
            ctx.body = {
                data:null,
                code:0,
                message:message
            }
        }
    }
}
export default error;