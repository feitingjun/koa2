//获取本机ip
import os from "os";
const interfaces = os.networkInterfaces();//获取本机ip
const getIPAdress = () => {
　　for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
export default getIPAdress; 