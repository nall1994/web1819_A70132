var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-test.di.uminho.pt/api/classes/nivel/1')
    .then(dados => res.render('index',{processos: dados.data}))
    .catch(error => res.render('error',{ message: 'error: ' + error})) 
});

router.get('/desc/:codPai', (req,res) => {
  var codigo = req.params.codPai
    axios.get('http://clav-test.di.uminho.pt/api/classes/c' + codigo + '/descendencia')
    .then(dados => {
      axios.get('http://clav-test.di.uminho.pt/api/classes/c' + codigo)
        .then(dados2 => {
          console.log(dados2.data)
          res.render('desc',{processos: dados.data, infoProcesso: dados2.data[0]})}
          )
        .catch(error => res.render('error',{message: 'error: ' + error}))
    })
    .catch(error => res.render('error',{message: 'error: ' + error}))
})


module.exports = router;
