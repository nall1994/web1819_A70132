var mongoose = require('mongoose')
const Schema = mongoose.Schema

var CompositorSchema = new Schema({
    _id: {type:String,required:true},
    nome: {type:String,required:true},
    bio: {type:String,required:true},
    dataNasc: {type:String,required:true},
    dataObito: {type:String,required:true},
    periodo: {type:String,required:true}
})

module.exports = mongoose.model('Compositor',CompositorSchema,'compositores')