var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const initStats = require('@zenmate/stats');

// ROUTERS
var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var usersRouter = require('./routes/users');
var fakeRouter = require('./routes/fake');
var queriesRouter = require('./routes/queries');
var pssRouter = require('./routes/pss');
var accountRouter = require('./routes/accounts');
var salesmotionRouter = require('./routes/salesmotions');

// MYSQL
const mysql      = require('mysql');
const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'sofa',
  password : 'S0fa1234',
  database : 'sofa'
});

const { statsMiddleware, getStats } = initStats({ endpointStats: true });

// MYSQL KEEP ALLIVE
setInterval(function () {connection.query('SELECT 1');console.log("MYSQL KEEPALIVE");}, 5000);

// EXPRESS APP
var app = express();

// VIEW ENGINER SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MIDDLEWARE
app.use(logger('dev'));
//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(statsMiddleware);

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// DETERMINE PROD v DEV
if (process.env.NODE_ENV === 'production') {
  // PRODUCTION
  const loc = path.join(__dirname, '../', 'client/build');
  app.use(express.static(loc));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(loc, '/index.html'));
  });
} else {
  //DEVELOPMENT
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', indexRouter);
}

// ROUTES
app.use('/users', usersRouter);
app.use('/fake', fakeRouter);
app.use('/queries', queriesRouter);
app.use('/pss', pssRouter);
app.use('/accounts', accountRouter);
app.use('/categories/', categoriesRouter);
app.use('/salesmotion', salesmotionRouter);

app.post('/create', (req, res) => {
    let linkString = req.body.link;
    res.send(linkString);
})

app.get('/stats', (req,res) => res.send(getStats()));

// ERROR HANDLER
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// GET PORT OR SET STATIC
app.set('port', process.env.PORT || 5000);

// INITIALISE APP
module.exports = app;
