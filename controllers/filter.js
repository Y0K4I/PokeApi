const errorHandler = require('../utils/errorHandler')
const Pokemon = require('../models/Pokemons')


module.exports.sortBy = async function (req, res) {
    try {
        if (req.body) {
            console.log(req.body)
            if(req.body.filterOption) {
                const{hpLess, hpMore, attackLess, attackMore, defenseLess, defenseMore, specialAttackLess, specialAttackMore, 
                    specialDefenseLess, specialDefenseMore, speedLess, speedMore, nameFind, type} = req.body.filterOption
                if(Number(hpLess) || Number(hpMore) || Number(attackLess) || Number(attackMore) || Number(defenseLess) || Number(defenseMore)
                    || Number(specialAttackLess) && Number(specialAttackMore) || Number(specialDefenseLess) || Number(specialDefenseMore)
                    || Number(speedLess) || Number(speedMore) || String(nameFind)) {
                    const sorted = await Pokemon.find({$and: [
                        !!type ? { $or: [{$or: type}] } : {},
                        { $and: [ 
                            !!hpLess || !!hpMore ?  { $or: [{ hp: !!hpLess && {$lt: Math.round(hpLess)} }, { hp: !!hpMore && {$gt: Math.round(hpMore)} } ]} : {},
                            !!attackLess || !!attackMore ?  { $or: [{ attack: !!attackLess && {$lt: Math.round(attackLess)} }, { attack: !!attackMore && {$gt: Math.round(attackMore)} } ]} : {},
                            !!defenseLess || !!defenseMore ?  { $or: [{ defense: !!defenseLess && {$lt: Math.round(defenseLess)} }, { defense: !!defenseMore && {$gt: Math.round(defenseMore)} } ]} : {},
                            !!specialAttackLess || !!specialAttackMore ?  { $or: [{ specialAttack: !!specialAttackLess && {$lt: Math.round(specialAttackLess)} }, { specialAttack: !!specialAttackMore && {$gt: Math.round(specialAttackMore)} } ]} : {},
                            !!specialDefenseLess || !!specialDefenseMore ?  { $or: [{ specialDefense: !!specialDefenseLess && {$lt: Math.round(specialDefenseLess)} }, { hp: !!specialDefenseMore && {$gt: Math.round(specialDefenseMore)} } ]} : {},
                            !!speedLess || !!speedMore ?  { $or: [{ speed: !!speedLess && {$lt: Math.round(speedLess)} }, { hp: !!speedMore && {$gt: Math.round(speedMore)} } ]} : {},
                        ]},
                        !!nameFind ? {name: {$regex: nameFind }} : {},
                    ]}).limit(!!req.query.limit ? +req.query.limit : 20).skip(!!req.query.offset ? +req.query.offset : 0)
                    
                    if (sorted.length === 0) {
                        res.status(400).json({
                            message: "Fuck u!"
                        })
                    } else {
                        res.status(200).json(sorted)
                    }
                    
                } else {
                    res.status(400).json({
                        message: "Error! Wrong type of variables!"
                    })
                }
            } else {
                res.status(400).json({
                    message: "Error! No Filter Options!"
                })
            }
        }
        
    } catch (e) {
        errorHandler(res, e)
    }
}