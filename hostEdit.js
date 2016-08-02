

var core=require('./hostOper/core');

var log = console.log;

function modifyHost(ip,domain){
    log(core.modifyHost(ip,domain));
}
function listHosts(){
    var arr=core.getHosts();
    log('当前启用的host:');
    log(arr.reduce(function(preValue,currValue){
        if(Object.prototype.toString.call(preValue)=='[object Object]')
            {
                preValue="\t"+preValue.ip+"\t"+preValue.domain+"\n";
            }
        return preValue+"\t"+currValue.ip+"\t"+currValue.domain+"\n";
    }))
}
module.exports={modifyHost:modifyHost,listHosts:listHosts};