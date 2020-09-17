const express = require('express')
const router = express.Router()

const controller = require('../controllers/pokemon')
const filter = require('../controllers/filter')

router.get('/getAllPokemons', controller.getAllPokemons)
router.get('/getPokemonsData', controller.getAllPokemonsData)
router.get('/getPokemonsStats', controller.getPokemonsStats)
router.get('/getStatOf/:id', controller.getPokemonStats)

router.get('/sortBy', filter.sortBy)

module.exports = router