'use strict';
const log4js = require('log4js');
const logConfig = require('../../config/config.log');
log4js.configure(logConfig);//加载配置文件
const resLogger = log4js.getLogger("resLogger");//调用预先定义的日志名称
const errorLogger = log4js.getLogger("errorLogger");
const consoleLogger = log4js.getLogger();
let logUtil = {};
//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};
//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};
logUtil.logInfo = function (info) {
    if (info) {
        consoleLogger.info(formatInfo(info));
    }
};
let formatInfo = function (info) {
    let logText = new String();
    logText += "\n" + "***************info log start ***************" + "\n";//响应日志开始
    logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";//响应内容
    logText += "*************** info log end ***************" + "\n";//响应日志结束
    return logText;
}
//格式化响应日志
let formatRes = function (ctx, resTime) {
    let logText = new String();
    logText += "\n" + "*************** response log start ***************" + "\n";//响应日志开始
    logText += formatReqLog(ctx.request, resTime);//添加请求日志
    logText += "response status: " + ctx.status + "\n";//响应状态码
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";//响应内容
    logText += "*************** response log end ***************" + "\n";//响应日志结束
    return logText;
}
//格式化错误日志
let formatError = function (ctx, err, resTime) {
    let logText = new String();
    logText += "\n" + "*************** error log start ***************" + "\n";//错误信息开始
    logText += formatReqLog(ctx.request, resTime);//添加请求日志
    logText += "err name: " + err.name + "\n";//错误名称
    logText += "err message: " + err.message + "\n";//错误信息
    logText += "err stack: " + err.stack + "\n";//错误详情
    logText += "*************** error log end ***************" + "\n";//错误信息结束
    return logText;
};
//格式化请求日志
let formatReqLog = function (req, resTime) {
    let logText = new String();
    let method = req.method;
    logText += "request method: " + method + "\n";//访问方法
    logText += "request originalUrl:  " + req.originalUrl + "\n";//请求原始地址
    logText += "request client ip:  " + req.ip + "\n";//客户端ip
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    }
    logText += "response time: " + resTime + "\n"; //服务器响应时间
    return logText;
}

module.exports = logUtil;
