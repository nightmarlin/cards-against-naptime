const mongoose = require('mongoose')

const schema = new mongoose.Schema({
})

const CardSet = mongoose.model('CardSet', schema)

module.exports = CardSet
