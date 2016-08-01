#! /usr/bin/env node

var hostEdit=require('./hostEdit');


var ipExp=/((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
	domainExp= /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
	ip=process.argv[2],
	domain=process.argv[3],
	err="";
	
if(!ipExp.test(ip)){
	err+="IP地址不合法\r\n";
	
}
if(!domainExp.test(domain)){
	err+="域名不合法";

}
if(""!=err){
	console.log(err);
	return;
}
hostEdit(ip,domain); 

