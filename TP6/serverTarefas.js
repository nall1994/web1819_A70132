var http = require('http')
var url = require('url')
var fs = require('fs')
var jsonfile = require('jsonfile')
var pug = require('pug')


var {parse} = require('querystring')

var myDataBase = 'choresBD.json'

var myServer = http.createServer((req,res) => {
    var purl = url.parse(req.url,true)

    if(req.method == 'GET') {
        if((purl.pathname == '/') || (purl.pathname == '/lista')) {
            jsonfile.readFile(myDataBase,(erro,tarefas) => {
                if(!erro) {
                    var tipos = collectTypes(tarefas.tasks)
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                    res.write(pug.renderFile('lista_tarefas.pug',{lista : tarefas.tasks, types: tipos}))
                    res.end()
                } else {
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('erro.pug', {e: "Erro na leitura da base de dados!"}))
                    res.end()
                }
                
            })
            
        } else if(purl.pathname == '/registo') {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('form_tarefa.pug'))
            res.end()
        } else if(purl.pathname == '/w3.css') {
            res.writeHead(200,{'Content-Type': 'text/css'})
            fs.readFile('stylesheets/w3.css',(erro,dados)=>{
                if(!erro) res.write(dados)
                else res.write(pug.renderFile('erro.pug',{e: erro}))
                res.end()
            })
        } else if(purl.pathname == '/apagar') {
            jsonfile.readFile(myDataBase,(erro,tarefas) => {
                if(!erro) {
                    var tipos = collectTypes(tarefas.tasks)
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('apagar_tarefas.pug',{types: tipos, lista: tarefas.tasks}))
                    res.end()
                }
            })
            
        }else {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('erro.pug', {e: "Erro: " + purl.pathname + " não está implementado!"}))
            res.end()
        }
    } else if(req.method == 'POST') {
        if(purl.pathname == '/processaForm') {
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myDataBase,(erro,tarefas) => {
                    if(!erro) {
                        var id = tarefas.task_counter
                        resultado["id"] = (id+1).toString()
                        tarefas.task_counter = tarefas.task_counter + 1
                        resultado["dataRegisto"] = getTodaysDate()
                        resultado["apagado"] = 'nao'
                        tarefas.tasks.push(resultado)
                        jsonfile.writeFile(myDataBase,tarefas,erro => {
                            if(erro) {
                                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                                res.write(pug.renderFile('erro.pug', {e: "Erro: " + erro}))
                                res.end()
                            } 
                        })
                    }
                })
                resultado["dataRegisto"] = getTodaysDate()
                resultado["apagado"] = 'nao'
                res.end(pug.renderFile('tarefa_registada.pug',{tarefa: resultado}))
            })
        }
        else if(purl.pathname == '/apagaTarefas') {
            recuperaInfo(req,resultado => {
                jsonfile.readFile(myDataBase,(erro,tarefas) => {
                    if(!erro) {
                        var ids = resultado.ids.split(',')
                        tarefas.tasks = deleteTasks(tarefas.tasks,ids)
                        var t = tarefas.tasks
                        var tipos = collectTypes(tarefas.tasks)
                        jsonfile.writeFile(myDataBase,tarefas,erro => {
                            if(erro) {
                                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                                res.write(pug.renderFile('erro.pug', {e: "Erro: " + erro}))
                                res.end()
                            } else {
                                res.writeHead(302, {'Location' : 'http://localhost:4010'})
                                res.end()
                            }
                        })
                    }
                })              
            })
        } else {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('erro.pug', {e: "Erro: " + purl.pathname + " não está implementado!"}))
            res.end()
        }
    } else {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('erro.pug', {e: "Método: " + req.method + " não suportado!"}))
            res.end()
    }
})

myServer.listen(4010,()=> {
    console.log("Servidor à escuta na porta 4010...")
})

function recuperaInfo(request, callback) {
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end',() => {
            callback(parse(body))
        })
    } else callback(null)
    
}

function getTodaysDate() {
    var today = new Date()
    var dia = today.getDate()
    var mes = today.getMonth()+1
    var ano = today.getFullYear()

    if(dia < 10)
        dia = '0' + dia
    if(mes < 10)
        mes = '0' + mes

    today = ano + '-' + mes + '-' + dia
    return today
}

function collectTypes(tarefas) {
    var collectedTypes = []

    for(var i=0; i< tarefas.length; i++) {
        var tipoAtual = tarefas[i]["tipo"]
        if((!hasType(tipoAtual,collectedTypes)) && (tarefas[i].apagado == 'nao')) {
            collectedTypes.push(tipoAtual)
        }           
    }

    return collectedTypes
}

function hasType(tipo,collected) {
    var ok = false;

    for(var i=0;i<collected.length; i++)
        if(collected[i] == tipo)
            ok = true
    
    return ok;
}

function deleteTasks(tarefas,ids) {

    for(var i = 0; i < ids.length;i++) {
        var search_id = ids[i]
        for(var j=0; j< tarefas.length;j++)
            if(tarefas[j].id == search_id)
                tarefas[j].apagado = 'sim'
    } 

    return tarefas
}
