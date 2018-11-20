var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    foto: {type:String},
    email: {type:String, required:true},
    nome: {type:String, required:true},
    nivelAcesso: {type:String, required:true},
    password: {type:String,required:true}
},{versionKey: false})

module.exports = mongoose.model('User',userSchema,'utilizadores')
