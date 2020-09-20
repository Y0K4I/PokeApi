const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemon = new Schema ({
    id: {
        type: Number
    },
    name: {
        type: String,
        text: true
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

pokemon.index({name: 'text'})

module.exports = mongoose.model('pokemonStats', pokemon)