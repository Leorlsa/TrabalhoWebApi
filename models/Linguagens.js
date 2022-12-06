const mongoose = require('mongoose')
const Linguagens = mongoose.model('Linguagens',{
    nome:String,
    ano:Number,
    descricao:String,
})
module.exports = Linguagens