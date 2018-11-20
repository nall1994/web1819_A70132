var express = require('express');
var router = express.Router();
var Users = require('../controllers/utilizador')
var formidable = require('formidable')

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/utilizadores', function(req, res) {
  Users.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/utilizadores/:user_email',function(req,res) {
  Users.consultar(req.params.user_email)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

router.post('/utilizadores',function(req,res) {
  //processar dados através da form data.
  var form = formidable.IncomingForm()
  form.parse(req,(erro,fields,files) => {
    var foto_path = files.foto.path
    var email = fields.email
    var nome = fields.nome
    var nivelAcesso = fields.nivelAcesso
    var password = fields.password

    Users.inserir(foto_path,email,nome,nivelAcesso,password)
  })
  var obj = {estado: 'ficheiro gravado com sucesso!'}
  res.jsonp(obj)
})

router.put('/utilizadores/:user_email',function(req,res) {
  var form = formidable.IncomingForm();
  form.parse(req,(erro,fields,files) => {
    Users.atualizar(req.params.user_email,fields.updateNome,fields.updateNivelAcesso,fields.updatePassword)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  })

})


module.exports = router;
