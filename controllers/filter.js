const errorHandler = require("../utils/errorHandler");
const Pokemon = require("../models/Pokemons");

module.exports.sortBy = async function (req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', 'origin, content-type, accept')
    if (req.body) {
      const filter = req.body.filterOptions
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
            typesArr = [...typesArr, {types: type}]
          })
        }
        
        let statsArr = []

        if (statFilter) {
          statFilter.forEach((stat) => {
            let statName = Object.keys(stat)[0];
            if (Number({...stat[statName]}.from) && Number({...stat[statName]}.to)) {
              statsArr = [...statsArr, { $and: [{ [statName]: {$gte: {...stat[statName]}.from}}, {[statName]: {$lte: {...stat[statName]}.to}}]  } ]
            } else if(Number({...stat[statName]}.from) && !{...stat[statName]}.to) {
              statsArr = [...statsArr, { $and: [{ [statName]: {$gte: {...stat[statName]}.from}}, {[statName]: {$lte: 9999999}}]  } ]
            } else if(!{...stat[statName]}.from && Number({...stat[statName]}.to)) {
              statsArr = [...statsArr, { $and: [{ [statName]: {$gte: 0}}, {[statName]: {$lte: {...stat[statName]}.to}}]  } ]
            } else {
              res.status(400).json({
                message: "Wrong type of " + statName
              })
            }
          })
        }
        console.log(statsArr);
        const sorted = await Pokemon.find({
          $and: [
            !!typesArr.length > 0 ? {$or: typesArr} : {},
            !!statsArr.length > 0 ? {$and: statsArr} : {},
            !!filterOptions.nameFilter ? {name: {$regex: filterOptions.nameFilter, $options: 'i' }} : {}
          ]
        })
        .limit(!!req.body.limit ? +req.body.limit : 10)
        .skip(!!req.body.offset ? +req.body.offset : 0)

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
}
