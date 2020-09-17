const errorHandler = require('../utils/errorHandler')
const Pokemon = require('../models/Pokemons')


module.exports.sortBy = async function (req, res) {
    try {
        if (req.body.type) {
            const sorted = await Pokemon.find({$or: req.body.type})
            res.status(200).json(sorted)
        }
    } catch (e) {
        errorHandler(res, e)
    }
}