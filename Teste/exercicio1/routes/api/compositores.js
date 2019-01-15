var express = require('express');
var router = express.Router();
var Compositor = require('../../controllers/Compositor')

router.get('/', function(req, res, next) {
  var periodo = req.query.periodo
  var data = req.query.data

  if(periodo && data) {
    Compositor.listarPorPeriodoEData(periodo,data)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).send('Erro na listagem por periodo e data!'))
  } else if(periodo) {
    Compositor.listarPorPeriodo(periodo)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).send('Erro na listagem por periodo'))
  } else {
    Compositor.listar()
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).send('Erro na listagem completa'))
  }
  
});

router.get('/:id',(req,res) => {
  var id  = req.params.id
  Compositor.obterCompositor(id)
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).send('Erro na listagem de utilizador por ID'))


})

module.exports = router;
