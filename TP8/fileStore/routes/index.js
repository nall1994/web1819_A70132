var express = require('express');
var formidable = require('formidable')
var fs = require('fs')
var jsonfile = require('jsonfile')
var router = express.Router();
var myBD = __dirname + '/ficheiros.json'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/ficheiros', (req,res) => {
  jsonfile.readFile(myBD,(erro,ficheiros) => {
    if(!erro) {
      res.render('tabela',{tabela: ficheiros})
    } 
    else {
      res.render('error',{e: erro})
    }
  })
})

router.post('/ficheiros/guardar',(req,res) => {
  var form = formidable.IncomingForm()
  form.parse(req,(erro,fields,files) => {
    var fich_enviado = files.file.path
    var fich_novo = './public/uploaded/' + files.file.name

    fs.rename(fich_enviado,fich_novo, erro => {
      if(!erro) {
        jsonfile.readFile(myBD,(erro,ficheiros) => {
          if(!erro) {
            var newObjString = '{ "nome" : "' + files.file.name + '",'
                                            + ' "descricao" : "' + fields.descricao + '",'
                                            + ' "dataSubmissao" : "' + fields.dataSubmissao + '" }'
            var newObj = JSON.parse(newObjString)
            ficheiros.push(newObj)
            jsonfile.writeFile(myBD,ficheiros, erro => {
              if(erro) {
                res.render('erro', {e: erro})
              } else {
                console.log('Ficheiro submetido com sucesso!')
              }
            })
          } else {
            res.render('erro',{e: erro})
          }
        })
      } else {
        res.render('erro',{e: erro})
      }
    })
  })
  var obj = {estado: "ficheiro gravado com sucesso!"}
  res.json(obj)
})

module.exports = router;
