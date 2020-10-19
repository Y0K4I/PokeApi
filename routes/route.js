const express = require('express')
const router = express.Router()

const controller = require('../controllers/pokemon')
const filter = require('../controllers/filter')

router.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


router.get('/getPokemonsStats', controller.getPokemonsStats) // database parse

router.get('/getStatOf/:id', controller.getPokemonStats)
router.get('/getPokemonsCount', controller.getPokemonsCount)
router.get('/getPokemonsTypes', controller.getPokemonsTypes)

router.post('/getPokemons', filter.sortBy)

module.exports = router