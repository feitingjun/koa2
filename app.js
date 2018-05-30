import Koa from "koa";
import cluster from "cluster";
import convert from "koa-convert";
import serve from "koa-static";
import bodyParser from "koa-bodyparser";
import logger from "./middleware/logger";
import error from "./middleware/error";
import router from "./router";
import getIPAdress from "./utils/getIPAdress";

const app = new Koa();
let port = process.env.PORT || 3000;
app.use(serve(__dirname + "/public"));//静态文件路径
app.use(bodyParser()); //处理post请求的body参数
app.use(logger());
app.use(error());
app.use(router.routes(),router.allowedMethods());
startServer(port);

function startServer(p){
    let server = app.listen(p);
    p = parseInt(p);
    server.on("error",(error)=>{
        if(error.code=="EADDRINUSE"){
            logger.error(`端口${p}已被占用,自动启用${p+1}端口`);
            port++;
            server.close();
            startServer(port);
        }
    })
    server.on("listening",()=>{
        logger.success(`服务器启动成功... \n地址 ${getIPAdress()}:${p}`);//获取本机ip
    })
}
