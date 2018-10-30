var express = require('express')
var http = require('http')
var pug = require('pug')
var url = require('url')
var fs = require('fs')
var formidable = require('formidable')
var logger = require('morgan')
var jsonfile = require('jsonfile')

var catalog = './uploaded/catalog.json'

var app = express()

var link_file = new RegExp('/uploaded/*')

app.use(logger('combined'))

app.all('*',(req,res,next)=> {
    if(req.url != '/w3.css')  {
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
    }
    next()
})

app.get('/',(req,res)=> {
    jsonfile.readFile(catalog,(erro,catalogo)=> {
        if(!erro) {
            res.write(pug.renderFile('page_components.pug',{ficheiros: catalogo}))
            res.end()
        } else {
            res.write(pug.renderFile('erro.pug',{e: erro}))
            res.end()
        }
    })
    
})

app.get(link_file,(req,res)=> {
    var catchFile = req.url.split('/')
    fs.readFile('uploaded/' + catchFile[2],(erro,dados) => {
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('erro.pug',{e : 'O ficheiro que procurou não foi encontrado!'}))
        res.end()
    })
})

app.get('/w3.css',(req,res)=> {
    res.writeHead(200,{'Content-Type':'text/css'})
    fs.readFile('stylesheets/w3.css',(erro,dados) => {
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('erro.pug',{e: erro}))
        res.end()
    })
})

app.post('/processaForm',(req,res)=> {
    var form = new formidable.IncomingForm()
        form.parse(req, (erro,fields,files)=> {
            var fich_enviado = files.ficheiro.path
            var fich_novo = './uploaded/' + files.ficheiro.name

            fs.rename(fich_enviado,fich_novo, erro => {
                if(!erro) {
                    jsonfile.readFile(catalog,(erro,ficheiros)=> {
                        if(!erro) {
                            var newFile = '{ "nome" : "' + files.ficheiro.name + '",'
                                            + ' "descricao" : "' + fields.descricao + '",'
                                            + ' "dataRegisto" : "' + getTodaysDate() + '" }'
                            var jobj = JSON.parse(newFile)
                            ficheiros.push(jobj)
                            jsonfile.writeFile(catalog,ficheiros,erro => {
                                if(erro) {
                                    res.write(pug.renderFile('erro.pug',{e: erro}))
                                    res.end()
                                } else {
                                    res.write(pug.renderFile('page_components.pug',{ficheiros: ficheiros}))
                                    res.end()
                                }
                            })
                        } else {
                            res.write(pug.renderFile('erro.pug',{e: erro}))
                            res.end()
                        }     
                    }) 
                } else {
                    res.write(pug.renderFile('erro.pug',{e: 'Ocorreu um erro ao armazenar o ficheiro!'}))
                    res.end()
                }
            })
        })
})



var myServer = http.createServer(app)

myServer.listen(7000,() => {
    console.log('Servidor à escuta na porta 7000...')
})

function getTodaysDate() {
    var today = new Date()
    var dia = today.getDate()
    var mes = today.getMonth()+1
    var ano = today.getFullYear()
    var hora = today.getHours()
    var minutos = today.getMinutes()
    var segundos = today.getSeconds()

    if(dia < 10)
        dia = '0' + dia
    if(mes < 10)
        mes = '0' + mes
    if(hora < 10)
        hora = '0' + hora
    if(minutos < 10)
        minutos = '0' + minutos
    if(segundos < 10)
        segundos = '0' + segundos

    today = 'data: ' + dia + '-' + mes + '-' + ano + '; hora: ' + hora + 'h:' + minutos + 'm:' + segundos + 's'
    return today
}