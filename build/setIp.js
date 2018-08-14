const os = require('os');
let localUrl = "localhost";
const devServerUrl = () => {
    try {
        let ifaces = os.networkInterfaces();
        for (let dev in ifaces) {
            if (dev != "Loopback Pseudo-Interface 1") {  //判断条件？？？
                ifaces[dev].forEach((details, alias) => {
                    if (details.family == 'IPv4') {
                        localUrl = details.address
                        return false;
                    }
                })
            }
        }
    } catch (e) {
        localUrl = 'localhost';
    }
}
devServerUrl()
module.exports = localUrl