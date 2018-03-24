var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var appRoutes = require('./routes/app');
var autoRoutes = require('./routes/autoecole');
var promoRoutes = require('./routes/promotion');
var packRoutes = require('./routes/pack');
var coursRoutes = require('./routes/cours');
var quizRoutes = require('./routes/quiz');
var contratRoutes = require('./routes/contrat');



var mongoose = require('mongoose');

var busboy = require('connect-busboy');
var fs = require('fs-extra'); 

var app = express();

//Connection à la base de donnée
mongoose.connect('mongodb://localhost:27017/autoecole');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configuration de route
app.use('/', appRoutes);
app.use('/auto', autoRoutes);
app.use('/promotion', promoRoutes);
app.use('/pack', packRoutes);
app.use('/cours', coursRoutes);
app.use('/quiz', quizRoutes);
app.use('/contrat', contratRoutes);



app.use(function(req, res, next){
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept');
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
next();
});


//upload file logo
var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/images/logo/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

app.post("/upload_logo", upload.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});
 
//upload file professeur
var storage_prof = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/images/professeur/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload_prof = multer({ storage: storage_prof });

app.post("/upload_prof", upload_prof.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});

//Upload file promotion

var storage_promo = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/images/promo/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload_promo = multer({ storage: storage_promo });

app.post("/upload_imgPromo", upload_promo.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});


//to download a file
app.get('/download', function (req, res, next) {
    var filePath = "/my/file/path/..."; // Or format the path using the `id` rest param
    var fileName = "report.pdf"; // The default name the browser will use

    res.download(filePath, fileName);    
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});


module.exports = app;
