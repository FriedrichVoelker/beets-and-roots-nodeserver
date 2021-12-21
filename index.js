var http = require('http');
var fs = require("fs")
const API = require("./api/controller")
const { getReqData } = require("./api/utils");

var server = http.createServer(async function (req, res) {

  // Routes

  if(req.url == "/"){
    fs.readFile("./index.html", function (error, pgResp) {
      if (error) {
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
      }
     
      res.end();
});
  }else if(req.url == "/user"){
    fs.readFile("./user.html", function (error, pgResp) {
      if (error) {
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
      }
     
      res.end();
});
  }else if(req.url == "/favicon.ico"){
    fs.readFile("./favicon.ico", function (error, pgResp) {
      if (error) {
        res.writeHead(404);
        res.write('Contents you are looking are Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.write(pgResp);
      }
     
      res.end();
});

// API Calls

  }else if(req.url == "/login" && req.method == "POST"){
    let data = JSON.parse(await getReqData(req))
    let msg = await new API().login(data.username,data.password)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(msg);
  }else if(req.url == "/register" && req.method == "POST"){
    let data = JSON.parse(await getReqData(req))
    let msg = await new API().register(data.username,data.password,data.email)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(msg);
  }else if(req.url == "/delete" && req.method == "POST"){
    let data = JSON.parse(await getReqData(req))
    let msg = await new API().delete(data)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(msg);
  }else if(req.url == "/get" && req.method == "POST"){
    let data = JSON.parse(await getReqData(req))
    let msg = await new API().getUser(data)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(msg);
  }

})

server.listen(process.env.PORT || 5000);

console.log(`Node.js web server at port ${process.env.PORT || 5000} is running..`);

