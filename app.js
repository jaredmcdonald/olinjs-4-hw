
/**
 * Module dependencies.
 */

var express = require('express')
,   http = require('http')
,   path = require('path')
,   mongoose = require('mongoose')
,	models = require('./models')(mongoose)
,   users = require('./routes/users')(models)
,   list = require('./routes/list')(models)
,   app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.SECRET || 'sekrety'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGOLAB_URI || 'localhost/twitter');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', list.index);
app.get('/users/new', users.new);
app.post('/users/new', users.postNew);
// app.post('/tweets/:user', noop);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
