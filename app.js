/*var express = require("express");
var app = new express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', function (req, res) {
    res.sendfile(__dirname + "/pages/index.html");
});

app.get('/medios', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("notificaciones");
        var query = {};
        dbo.collection("medios").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});


app.listen(4000, function () {
    console.log('app listening on port 4000!');
});*/

//----------------------------------------

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');
var bodyParser = require('body-parser')

var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

mongoose.connect('mongodb://localhost:27017/', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});*/

//------------------------------------------------------------

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();


mongoose.connect('mongodb://localhost/notificaciones', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());


var models = require('./modelos/medio').default(app, mongoose);
var ClientCtrl = require('./controladores/medios');

var router = express.Router();

router.get('/', function(req, res) { 
 res.send("APP");
});

app.use(router);

var api = express.Router();

api.route('/medios') 
 .get(ClientCtrl.findAll)
 .post(ClientCtrl.add);

api.route('/medios/:id') 
 .get(ClientCtrl.findById)
 .put(ClientCtrl.update)
 .delete(ClientCtrl.delete);

app.use('/api', api);


// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});