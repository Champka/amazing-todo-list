const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('cookie-session'); // Charge le middleware de sessions
const bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');

// Initializing socket.io
var app = express()

// All our todos will be stored in this array (be careful)
app.todos = []

// Loading our server & socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Initializing our namespace for all 'adding' actions
// Our sockets will only be listened if you are in this namespace
var nsp_add = io.of('/todo/add/');
nsp_add.on('connection', function(socket) {

});

// Initializing our namespace for all 'deletion' actions
// Our sockets will only be listened if you are in this namespace
var nsp_del = io.of('/todo/delete/');
nsp_del.on('connection', function(socket) {

});

// Initializing our parser to read all request
app.use(urlencodedParser)

// "Handlebar" template initialization
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname)
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))


// Loading our modules
// Todo : Will manage all actions around "todo" objects
// Home : Will simply initialize our homepage
require('./todo').init(app, io)
require('./home').init(app, io)

//The 404 route managment
app.get('*', function(req, res){
    res.status(404).send(`DAMN IT'S A 404 PAGE`);
});

server.listen(3000, () => console.log('The amazing todo list app listening on port 3000!'))