
var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) {
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名

   fs.readFile("./index.html", function (err, data) {
   if (err) {
      console.log(err);
      // HTTP 状态码: 404 : NOT FOUND
      // Content Type: text/html
      response.writeHead(404, {'Content-Type': 'text/html'});
   }else{
      // HTTP 状态码: 200 : OK
      // Content Type: text/html
      response.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(pathname.substr(1),function (err,data) {
        console.log("Request for " + pathname + " received.");
        response.write(data.toString());
        response.end(pathname.substr(1));
      })
      // 响应文件内容
      response.write(data.toString());
   }
   //  发送响应数据
   response.end();
});
   // 从文件系统中读取请求的文件内容
}).listen(8080);


// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/\n Use ctrl+c to exit');
