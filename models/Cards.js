const mongoose = require('mongoose')
const Schema = mongoose.Schema

const card = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model('pokemons', card)