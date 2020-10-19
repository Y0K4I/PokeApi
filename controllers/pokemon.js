const Pokemon = require('../models/Pokemons')
const errorHandler = require('../utils/errorHandler')
const axios = require('axios')

module.exports.getPokemonsStats = async function(req, res) {
    try {
        let i = 1
        const getCount = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1&offset=0')

        for(i; i <= (getCount.data.count + 9107); i++) {
            if (i === 894) {
                i += 9107
            }

            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)

            if (result.data.stats.length === 0) {
                const statsOfUndefined = new Pokemon({
                    name: "NoName",
                    id: i,
                    types: ["normal"],
                    hp: 1,
                    attack: 1,
                    defense: 1,
                    specialAttack: 1,
                    specialDefense: 1,
                    speed: 1
                }).save()
                console.log(i + "NoName"); 
            } else {
                const stats = new Pokemon({
                    name: result.data.name,
                    id: result.data.id,
                    types: result.data.types.map(type => type.type.name),
                    hp: result.data.stats[0].base_stat,
                    attack: result.data.stats[1].base_stat,
                    defense: result.data.stats[2].base_stat,
                    specialAttack: result.data.stats[3].base_stat,
                    specialDefense: result.data.stats[4].base_stat,
                    speed: result.data.stats[5].base_stat
                }).save()
                console.log(i);
            }
        }

        res.status(200).json({
            message: "Pokemons copied"
        })

    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getPokemonStats = async function(req, res) {
    try {
        res.set('Access-Control-Allow-Origin', '*')
        const stats = await Pokemon.findOne({id: req.params.id})
        res.status(200).json(stats)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getPokemonsCount = async function(req, res) {
    try {
        res.set('Access-Control-Allow-Origin', '*')
        const pokemons = await Pokemon.find()
        const pokemonsCount = pokemons.length
        res.status(200).json({
            count: pokemonsCount
        })
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getPokemonsTypes = async function(req, res) {
    try {
        res.set('Access-Control-Allow-Origin', '*')
        let typesArr = []
        const pokemonsTypes = await axios.get('https://pokeapi.co/api/v2/type')
        const apiArr = pokemonsTypes.data.results

        apiArr.map(type => {
            typesArr = [...typesArr, type.name]
        })

        res.status(200).json({
            types: typesArr
        })

    } catch(e) {
        errorHandler(res, e)
    }
}
