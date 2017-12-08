var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
	var photosDataCollection = mongoConnection.collection('photoData');
  photosDataCollection.find({}).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching photos from DB");
    } else {
      console.log("== query results:", results);
      res.status(200).render('body', {
        photos: photoData
      });
    }
  });
});

app.get('/photos', function (req, res) {

  var photoDataCollection = mongoConnection.collection('photoData');
  photoDataCollection.find({}).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching people from DB");
    } else {
      console.log("== query results:", results);
      res.status(200).render('body', {
        photos: photoData
      });
    }
  });
});

app.get('/:title', function(req, res, next) {
  var photoDataCollection = mongoConnection.collection('photoData');

  photoDataCollection.find({ title: req.params.title }).toArray(function (err, results) {
    if (err) {
      res.status(500).send("Error fetching photos from DB");
    } else if (results.length > 0) {
      res.status(200).render('photoPage', photoData[0]);
    } else {
      next();
    }
  });
});

app.get('/:title', function (req, res, next) {
  var photoDataCollection = mongoConnection.collection('photoData');
  photoDataCollection.updateOne({title: req.params.title}, {$inc: {loveCount: 1}}, function (err, result) {
    if (err) {
      res.status(500).send('Error updating photo in datatbase');
    }
    else {
      res.status(200).send('photo loved successfully');
    }
  });
});

app.use(bodyParser.json());
app.use('*', function (req, res) {
	res.status(404).render('404');
});

app.use(express.static('public'));

// mongoose.connect(mongoURL);
//
// app.post('/photos/addPhoto', function (req, res, next) {
//
//
//     if (req.body && req.body.titleText) {
//         var photoDataCollection = mongoConnection.collection('photoData');
//         var photoObj = {
//             titleText: req.body.titleText,
//             photoURL: req.body.photoURL,
//             loveCount: 0
//         };
//
//         // example schema
//         var schema = new Schema({
//             img: { data: Buffer, contentType: String }
//         });
//
//         // our model
//         var imgModel = mongoose.model('imgModel', schema);
//
//
//         var thisModel = new imgModel;
//         thisModel.img.data = fs.readFileSync(req.body.photoURL);
//         thisModel.img.contentType = 'image/png';
//         photoDataCollection.insertOne( { titleText: req.params.titleText, photoURL: thisModel, loveCount: 0 } );
//
//
//     } else {
//         res.status(400).send("Request body needs a `photoURL` field.");
//     }
// });

app.post('/:title/addPhoto', function (req, res, next) {

  if (req.body && req.body.photoURL) {
    var photoDataCollection = mongoConnection.collection('photoData');
    var photoObj = {
			title: req.body.title,
      photoURL: req.body.photoURL,
			loveCount: req.body.loveCount
    };

    photoDataCollection.updateOne(
      { title: req.params.title },
      { $push: { photos: photoObj } },
      function (err, result) {
        if (err) {
          res.status(500).send("Error fetching photos from DB");
        } else {
          res.status(200).send("Success");
        }
      }
    );

  } else {
    res.status(400).send("Request body needs a `photoURL` field.");
  }

  // var personId = req.params.personId;
  // if (peopleData[personId]) {
  //   if (req.body && req.body.photoURL) {
  //     peopleData[personId].photos.push({
  //       photoURL: req.body.photoURL,
  //       caption: req.body.caption
  //     });
  //     res.status(200).send("Success");
  //   } else {
  //     res.status(400).send("Request body needs a `photoURL` field.");
  //   }
  // } else {
  //   next();
  // }
});


MongoClient.connect(mongoURL, function (err, connection) {
  if (err) {
    throw err;
  }
  mongoConnection = connection;
  app.listen(port, function () {
    console.log("== Server listening on port:", port);
  });
});
