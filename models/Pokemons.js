const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemon = new Schema ({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    types: {
        type: Array
    }, 
    hp: {
        type: Number
    },
    attack: {
        type: Number
    },
    defense: {
        type: Number
    },
    specialAttack: {
        type: Number
    },
    specialDefense: {
        type: Number
    },
    speed: {
        type: Number
    }
})

module.exports = mongoose.model('pokemonStats', pokemon)