var bodyParser = require('body-Parser');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');


var photoData = require('./photoData');
var app = express();
var port = process.env.PORT || 3000;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	res.render('body', {
	all: true,
	photos: photoData
	});
});

app.get('/', function (req, res) {
  res.render('content');
});

app.use(body-Parser.json());
app.use('*', function (req, res) {
	res.status(404).render('404');
});

app.use(express.static('public'));

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});






