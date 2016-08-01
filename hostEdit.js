var os = require('os');
var fs = require('fs');

var log = console.log;

function getHost() {
    var platform = os.platform();
    console.log(platform);
    platform = platform.indexOf("win32") > -1 ? "windows" : platform.indexOf("linux") > -1 ? "linux" : "other";
    var hostPath = "C:\\windows\\system32\\drivers\\etc\\hosts";
    switch (platform) {
        case "linux":
            hostPath = "/etc/hosts";

    }
    return hostPath;
}

function modifyHost(ip, domain) {
    var host = getHost();
    if(!fs.existsSync(host)){
        log("未找到host文件");
        return;
    }
    var content = fs.readFileSync(host, "utf-8");
    var reg = new RegExp("#?\\s*" + ip + "\\s*" + domain + "\\s*\S*\\r\\n", "g");
    var arr;
    while ((arr = reg.exec(content)) !== null) {  
        if ((arr[0].charAt(0)) === '#') {
            content = (content.slice(0, arr.index) + content.slice(arr.index + 1, content.length));
            fs.writeFile(host, content);
            return;
            //console.log(content[arr.index]);
        } else {
            return;
        }
    }
    fs.appendFile(host, ip + "\t" + domain + "\r\n");
}
module.exports=modifyHost