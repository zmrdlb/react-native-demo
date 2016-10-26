const http = require('http');
const url = require('url');
const querystring = require('querystring');

function writeempty(res) {
    res.setHeader('Content-Type','text/plain');
    res.writeHead(200);
    res.end('');
}

http.createServer((req,res) => {
    var urlobj = url.parse(req.url);
    var pathname = urlobj.pathname;

    console.log(urlobj.query);

    switch(pathname){
        case '/listdata':
            if(req.method.toUpperCase() == 'POST'){
                var postdata = '';
                req.on('data',(data) => {
                    postdata += data;
                });
                req.on('end',() => {
                    console.log(postdata);
                    var argsobj = querystring.parse(postdata);
                    console.log(argsobj);
                });

                var dataBlob = [], rowIndex = 0;
                for(var i = 0; i < 10; i++){
                    dataBlob.push({
                       txt: 'row data '+ rowIndex + ' -' + urlobj.query,
                       imgsrc: 'https://facebook.github.io/react/img/logo_og.png',
                    });
                    rowIndex++;
                }
                res.setHeader('Content-Type','application/json');
                res.writeHead(200);
                res.end(JSON.stringify({
                    code: 'A0001',
                    data: dataBlob
                    //errmsg: '接口返回的错误信息'
                }),'utf8');
            }else{
                writeempty(res);
            }
            break;
        default:
            writeempty(res);
            break;

    }
}).listen(8000);