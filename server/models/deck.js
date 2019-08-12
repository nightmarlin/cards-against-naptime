const mongoose = require('mongoose')

const schema = new mongoose.Schema({
})

const Deck = mongoose.model('Deck', schema)

module.exports = Deck
