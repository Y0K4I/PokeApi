const errorHandler = require("../utils/errorHandler");
const Pokemon = require("../models/Pokemons");

module.exports.sortBy = async function (req, res) {
  try {
    res.set('Access-Control-Allow-Origin', '*')
 
    if (req.body) {
      console.log(req);
      const filter = req.body
      let filterOptions = {}

      filter.forEach((element) => {
        const tempName = Object.keys(element)[0]
        const tempValue = Object.values(element)[0]
        filterOptions[tempName] = tempValue
      });

        const statFilter = filterOptions.statFilter
        const typeFilter = filterOptions.typeFilter

        let statsObj = {}
        let typesArr = []

        if(typeFilter) {
          typeFilter.map(type => {
            const typeObj = {types: type}
            typesArr = [...typesArr, typeObj]
          })
        }

        if (statFilter) {
          statFilter.forEach((stat) => {
            let statName = Object.keys(stat)[0];
            if (Number({...stat[statName]}.from) && Number({...stat[statName]}.to)) {
              statsObj[statName] = statName
              statsObj[statName+"From"] = Number(Math.round({...stat[statName]}.from))
              statsObj[statName+"To"] = Number(Math.round({...stat[statName]}.to))
            } else if (!{...stat[statName]}.from) {
              statsObj[statName+"From"] = 0
            } else if (!{...stat[statName]}.to) {
              statsObj[statName+"To"] = 9999
            } else {
              res.status(400).json({
                message: "Wrong type of " + statName
              })
            }
          })
        }

        console.log(statsObj);
             
        const sorted = await Pokemon.find({
          $and: [
            !!typesArr.length > 0 ? {$or: typesArr} : {},
            !!statsObj ? {$and: [
              !!statsObj.hp ? {$and: [{hp: {$gte: statsObj.hpFrom}}, {hp: {$lte: statsObj.hpTo}} ]} : {},
              !!statsObj.attack ? {$and: [{attack: {$gte: statsObj.attackFrom}}, {attack: {$lte: statsObj.attackTo}} ]} : {},
              !!statsObj.defense ? {$and: [{defense: {$gte: statsObj.defenseFrom}}, {defense: {$lte: statsObj.defenseTo}} ]} : {},
              !!statsObj.specialAttack ? {$and: [{specialAttack: {$gte: statsObj.specialAttackFrom}}, {specialAttack: {$lte: statsObj.specialAttackTo}} ]} : {},
              !!statsObj.specialDefense ? {$and: [{specialDefense: {$gte: statsObj.specialDefenseFrom}}, {specialDefense: {$lte: statsObj.specialDefenseTo}} ]} : {},
              !!statsObj.speed ? {$and: [{speed: {$gte: statsObj.speedFrom}}, {speed: {$lte: statsObj.speedTo}} ]} : {},
            ]} : {},
            !!filterOptions.nameFilter ? {name: {$regex: filterOptions.nameFilter }} : {}
          ]
        })
        .limit(!!req.query.limit ? +req.query.limit : 10)
        .skip(!!req.query.offset ? +req.query.offset : 0)

      if (sorted.length == 0) {
        res.status(400).json({
          message: "Wrong inputs!"
        })
      }
      else {
        res.status(200).json(sorted)
      }
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
