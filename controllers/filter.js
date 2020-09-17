const errorHandler = require('../utils/errorHandler')
const Pokemon = require('../models/Pokemons')


module.exports.sortBy = async function (req, res) {
    try {
        if (req.body) {
            const allTypes = [{types: "fire"}]
            const sorted = await Pokemon.find({$and: [
                { $or: [ {$or: req.body.type}, {$or: allTypes} ] },
                { $and: [ 
                    { $or: [{ hp: {$lt: req.body.hpLess} }, { hp: {$gt: req.body.hpMore} }, { hp: {$gt: 0} } ]},
                    { $or: [{ attack: {$lt: req.body.attackLess} }, { attack: {$gt: req.body.attackMore} }, { attack: {$gt: 0} } ]},
                    { $or: [{ defense: {$lt: req.body.defenseLess} }, { defense: {$gt: req.body.defenseMore} }, { defense: {$gt: 0} } ]},
                    { $or: [{ specialAttack: {$lt: req.body.specialAttackLess} }, { specialAttack: {$gt: req.body.specialAttackMore} }, { specialAttack: {$gt: 0} } ]},
                    { $or: [{ specialDefense: {$lt: req.body.specialDefenseLess} }, { specialDefense: {$gt: req.body.specialDefenseMore} }, { specialDefense: {$gt: 0} } ]},
                    { $or: [{ speed: {$lt: req.body.speedLess} }, { speed: {$gt: req.body.speedMore} }, { speed: {$gt: 0} } ]},
                ]}
            ]})
            res.status(200).json(sorted)
        }
        
    } catch (e) {
        errorHandler(res, e)
    }
}