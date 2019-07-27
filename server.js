const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/', express.static('pokemon'));
app.use(express.static(__dirname + '/public'));

const Pokemon = require('./models/pokemon.js');



app.get('/', (req, res) => {
	res.send(Pokemon);
});
//make new pokemon
app.get('/pokemon/', (req, res) => {
	res.render('index.ejs', {
		pokemon: Pokemon
	});
})

//always new pokemon to get added to index
app.get('/pokemon/new', (req, res) => {
	res.render('new.ejs')
})

//user goes to pokemon index route with clickable list

app.post('/pokemon/', (req, res) => {
	Pokemon.push(req.body); 
	res.redirect('/pokemon')
})
//edit pokemon

app.get('/pokemon/:id/edit', (req, res) => {
	res.render('edit.ejs', {
		pokemon: Pokemon[req.params.id],
		index: req.params.id
	})
})

//update the edit
app.put('/pokemon/:id', (req, res) => {
	Pokemon[req.params.id] = req.body;
	res.redirect('/pokemon');
})

//show route

app.get('/pokemon/:id', (req, res) => {
	res.render('show.ejs', {
		pokemon: Pokemon[req.params.id]
	});
});
//delete pokemon
app.delete('/pokemon/:id', (req, res) => {
	Pokemon.splice(req.params.id, 1);
	res.redirect('/pokemon');
})




app.listen(3000, () => {
	console.log('listening');
});

module.exports = app;