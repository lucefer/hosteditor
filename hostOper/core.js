var os = require('os');
var fs = require('fs');

var platform = "windows";
var host = getHost(),
    regAll = new RegExp("\\s*((?:[0-9]{1,3}\\.){3}\\d{1,3}|::1)\\s*(\\S+\\s*[^#]\\S*)\\s*[\\r\\n]", "g");

function getHost() {
    platform = os.platform();
    platform = platform.indexOf("win32") > -1 ? "windows" : platform.indexOf("darwin") > -1 ? "darwin" : "linux";
    var hostPath = "C:\\windows\\system32\\drivers\\etc\\hosts";
    switch (platform) {
        case "linux":
        case "darwin":
            hostPath = "/etc/hosts";
    }
    return hostPath;
}

function modifyHost(ip, domain) {
    var result = "";
    if (!fs.existsSync(host)) {
        result = "未找到host文件";
    }
    try {
        var content = fs.readFileSync(host, "utf-8");
        var reg = new RegExp("#?\\s*" + ip + "\\s*\\S*" + domain + "\\s*\\S*[\\r\\n]", "g");
        var arr;
        var exist = false;
        while ((arr = reg.exec(content)) !== null) {
            console.log(arr);
            if ((arr[0].charAt(0)) === '#') {
                content = (content.slice(0, arr.index) + content.slice(arr.index + 1, content.length))
                fs.writeFileSync(host, content);
                result = "host设置成功";
                exist = true;
                break;

            } else {
                exist = true;
                result = "host设置成功";
                break;
            }
        }
        if (!exist) {
            if (platform != "windows") {
                fs.appendFileSync(host, ip + "\t" + domain + "\n");
            } else {
                fs.appendFileSync(host, ip + "\t" + domain + "\r\n");
            }
            result = "host设置成功";
        }

    } catch (ex) {
        result = ("host设置失败\r\n" + ex);
    } finally {
        return result;

    }
}

function getHosts() {
    var content = fs.readFileSync(host, "utf-8");
    var arr = null,
        result = [];
    while ((arr = regAll.exec(content)) != null) {
        result.push({
            ip: arr[1],
            domain: arr[2]
        });
        //result.push('\t' + arr[1] + '\t' + arr[2]);
    }
    return result;
}
module.exports = {
    modifyHost: modifyHost,
    getHosts: getHosts
}
