var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;


var photoData = require('./photoData');
var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;

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

app.get('/photos', function (req, res) {

  var photosDataCollection = mongoConnection.collection('photosData');
  photosDataCollection.find({}).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching photos from DB");
    } else {
      console.log("== query results:", results);
      res.status(200).render('body', {
        photos: results
      });
    }
  });
});


app.use(bodyParser.json());
app.use('*', function (req, res) {
	res.status(404).render('404');
});

app.use(express.static('public'));

MongoClient.connect(mongoURL, function (err, connection) {
  if (err) {
    throw err;
  }
  mongoConnection = connection;
  app.listen(port, function () {
    console.log("== Server listening on port:", port);
  });
});
