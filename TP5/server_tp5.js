var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')

var obraurl = /\/obra\//

http.createServer((req,res)=> {
    var purl = url.parse(req.url)

    if((purl.pathname == '/') || (purl.pathname == '/index')) {
        res.writeHead(200,{'Content-Type': 'text/html'})
        fs.readFile('json/index.json',(erro,dados) => {
            if(!erro)
                res.write(pug.renderFile('index.pug',{obras: JSON.parse(dados)}))
            else
                res.write('<p><b> ERRO: </b>' + erro + '</p>')
            res.end()
        })
    } else if(obraurl.test(purl.pathname)){
        var ficheiro = purl.pathname.split('/')[2]
        res.writeHead(200,{'Content-Type': 'text/html'})
        fs.readFile('json/' + ficheiro + '.json',(erro,dados) => {
            if(!erro)
                res.write(pug.renderFile('individual.pug',{obra: JSON.parse(dados)}))
            else
                res.write('<p><b> ERRO: </b>' + erro + '</p>')
            res.end()
        })

    } else if(purl.pathname == '/w3.css') {
        res.writeHead(200,{'Content-Type': 'text/css'})
        fs.readFile('estilo/w3.css',(erro,dados) => {
            if(!erro)
                res.write(dados)
            else
                res.write('<p><b> ERRO: </b>' + erro + ' </p>')
                res.end()
        })
    } else {
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write('<p><b> ERRO, pedido desconhecido:  </b>' + purl.pathname + ' </p>')
        res.end()
    }
}).listen(5000,()=> {
    console.log("Servidor à escuta na porta 5000...")
})