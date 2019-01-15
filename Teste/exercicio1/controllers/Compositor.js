var Compositor = require('../models/compositor')

module.exports.listar = () => {
    return Compositor
                .find({},{_id: 1, nome: 1, dataNasc: 1})
                .exec()
}

module.exports.obterCompositor = id => {
    return Compositor
                .findOne({_id: id})
                .exec()
}

module.exports.listarPorPeriodo = periodo => {
    return Compositor
                .find({periodo: periodo})
                .exec()
}

module.exports.listarPorPeriodoEData = (periodo,data) => {
    return Compositor
                .find({periodo: periodo, dataNasc: {$gte: data}})
                .exec()
}