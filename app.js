import Koa from "koa";
import socketIo from "socket.io";
import cluster from "cluster";
import convert from "koa-convert";
import serve from "koa-static";
import bodyParser from "koa-bodyparser";
import logger from "./middleware/logger";
import error from "./middleware/error";
import router from "./router";
import "./utils/rewrite";
import getIPAdress from "./utils/getIPAdress";
import Cache from "./utils/cache";

const app = new Koa();
global.globalCache = new Cache();
let port = process.env.PORT || 3000;

global.IPorProt = getIPAdress() + ":" + port;
if(process.env.NODE_ENV === 'production') IPorProt =  "47.106.234.113";

app.use(serve(__dirname + "/public"));//静态文件路径
app.use(bodyParser()); //处理post请求的body参数
app.use(logger());
app.use(error());
app.use(router.routes(),router.allowedMethods());
const io = startServer(port);
global.io = io;
io.on("connection",(socket) => {

    let currentAppId,currentUserId;
    logger.success("socket连接成功")
    socket.on("saveAppId",({ appId }) => {
        global.globalCache.set(appId, socket.id);
        currentAppId = appId;
    })
    socket.on("enterHome", ({ userId }) => {
        console.log(`用户${userId}登录成功`);
        global.globalCache.set(userId, socket.id);
        currentUserId = userId
    })

    socket.on("disconnect",() => {
        global.globalCache.del(currentAppId);
        global.globalCache.del(currentUserId);
        logger.error(`用户${currentUserId}断开连接`);
    })
})

function startServer(p){
    let server = app.listen(p);
    const io = socketIo(server);
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
        if(process.env.NODE_ENV === "production"){
            logger.success(`服务器启动成功... \n地址 ${IPorProt}:${p}`);//获取本机ip
        }else{
            logger.success(`服务器启动成功... \n地址 ${getIPAdress()}:${p}`);//获取本机ip
        }
    })
    return io;
}
