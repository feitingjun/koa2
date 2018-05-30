import colors from "colors";

const logger = (opts) => {
    return async (ctx,next) => {
        const start = new Date();
        console.log(`\n--> ${ctx.method} ${ctx.url}`.yellow);
        await next();
        const end = new Date();
        const ms = end - start;
        console.log(`<-- ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms`.green);
    }
}
logger.info = (msg) => {//黄色
    console.log(`${msg}`.yellow);
}
logger.success = (msg) => {//绿色
    console.log(`${msg}`.green);
}
logger.error = (msg) => {//红色
    console.log(`${msg}`.red);
}
logger.debug = (msg) => {//酒红
    console.log(`${msg}`.magenta);
}
logger.help = (msg) => {//灰白
    console.log(`${msg}`.cyan);
}
logger.data = (msg) => {//蓝色
    console.log(`${msg}`.blue);
}
logger.silly = (msg) => {//五彩
    console.log(`${msg}`.rainbow);
}
export default logger;