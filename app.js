const express = require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')

const route = require('./routes/route')

const app = express()

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(keys.mongoURL).then(() => console.log('MongodDB connected'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/PokeApi', route)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

module.exports = app