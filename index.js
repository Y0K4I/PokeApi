const app = require('./app')
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/PokeApi/getPokemons', (req, res) => {
request(
    {url: 'https://pokemonapishort.herokuapp.com/PokeApi/getPokemons' },
    (error, response, body) => {
    if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
    }
  
    res.json(JSON.parse(body));
    }
)
});

app.listen(port, () => console.log(`Server has been started on ${port}`))
