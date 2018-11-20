var User = require('../models/utilizador')

var Users = module.exports

//Listar utilizadores existentes
Users.listar = () => {
    return User
        .find()
        .sort({nome: 1}) // ordem alfabética
        .exec()
}

//listar um utilizador

Users.consultar = user_email => {
    // O que está a correr mal aqui? O porquê de dar Internal Server Error?
    console.log(user_email)
    return User
        .find({email: user_email})
        .exec()
}

//Inserir um utilizador

Users.inserir = (foto,email,nome,nivelAcesso,password) => {
    var utilizador = new User({
        foto: foto,
        email: email,
        nome: nome,
        nivelAcesso: nivelAcesso,
        password: password
    })

    utilizador.save( error => {
        if(error) console.log("Couldn't save user!")
        else console.log("User saved successfully!")
    })
}

//Atualizar um utilizador
Users.atualizar = (email,nome,nivelAcesso,password) => {
    return User
        .findOneAndUpdate({email: email},{$set: {nome:nome, nivelAcesso: nivelAcesso, password: password}})
        .exec()
}