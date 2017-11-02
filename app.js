var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    ejs             = require('ejs'),
    mongoose        = require('mongoose'),
    methodOverRide  = require('method-override');
    
// CONFIGARATION
app.use(bodyParser.urlencoded ({extended: true}));
app.set('view engine', 'ejs');      //__dirname reffer to the directory that the script is running 280 1:58
app.use(express.static(__dirname + '/public')); //used to be app.use(express.static('public')).. better to do it with __dirname
app.use(methodOverRide('_method'));

// INDEX
app.get('/', function(req, res) {
    res.redirect('/start-coding-after-40');
});

// GET
app.get('/start-coding-after-40', function(req, res) {
    res.send('GET');
});

// NEW

// SHOW

// EDIT

// DELETE
    
app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Server Start-coding-after-40 app has started');
});