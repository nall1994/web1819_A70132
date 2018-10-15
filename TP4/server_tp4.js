var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer((req,res) => {
    var obj = url.parse(req.url,true);
    var arr = obj.pathname.split("/");
    if(arr.length == 1)
        {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write('<p> Não procurou por nenhuma página em específico </p>');
            res.end();
        } else if(arr[1] == 'index.html') {
            fs.readFile('website/index.html',(erro,dados) => {
                if(!erro)
                    res.write(dados)
                else
                    res.write('<p><b>ERRO: </b> ' + erro + '</p>');
                res.end();
            }); 
        } else if(arr[1] == 'arqelems') {
            fs.readFile('website/html/' + arr[2],(erro,dados) => {
                if(!erro)
                    res.write(dados);
                else
                    res.write('<p><b>ERRO: </b> ' + erro + '</p>');
                res.end();
            });
        } else {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write('<p> Nao foi possivel encontrar a pagina pedida </p>');
            res.end();
        }
}).listen(4005,()=>{
    console.log("Servidor à escuta na porta 4005");
})