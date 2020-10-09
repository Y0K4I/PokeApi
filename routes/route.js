const express = require('express')
const router = express.Router()

const controller = require('../controllers/pokemon')
const filter = require('../controllers/filter')

router.get('/getPokemonsStats', controller.getPokemonsStats) // database parse

router.get('/getStatOf/:id', controller.getPokemonStats)
router.get('/getPokemonsCount', controller.getPokemonsCount)
router.get('/getPokemonsTypes', controller.getPokemonsTypes)

router.get('/getPokemons', filter.sortBy)

module.exports = router