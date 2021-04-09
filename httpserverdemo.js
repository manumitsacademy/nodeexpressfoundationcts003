var http = require('http');
var fs = require('fs');
http.createServer(
    function(req,res){
        console.log(req.url);
        res.writeHead(404, {'Content-Type': 'text/html'});
        if(req.url==='/home'){
            var homepage = fs.readFileSync("home.html");
            res.write(homepage.toString());
            res.end();
        }
    }
).listen(9090)

