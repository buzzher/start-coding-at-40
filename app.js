var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    ejs             = require('ejs'),
    mongoose        = require('mongoose'),
    methodOverRide  = require('method-override');
    
// CONFIGARATION
mongoose.connect('mongodb://localhost/coding-after-40');
app.use(bodyParser.urlencoded ({extended: true}));
app.set('view engine', 'ejs');      //__dirname reffer to the directory that the script is running 280 1:58
app.use(express.static(__dirname + '/public')); //used to be app.use(express.static('public')).. better to do it with __dirname
app.use(methodOverRide('_method'));

// MONGOOSE SETOP
var CodingSchema = new mongoose.Schema({
    title: String,
    body: String,
    create: {type: Date, default: Date.now}
});

var Codes = mongoose.model('codingAfter40', CodingSchema);

// Codes.create({
//     title: 'Start code',
//     body: 'Good to learn coding'
// });

// INDEX
app.get('/', function(req, res) {
    res.redirect('/index');
});

// GET
app.get('/index', function(req, res) {
    Codes.find('/', function(err, callBackUsers) {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {users: callBackUsers});
        }
    });
});

// NEW
app.get('/index/new', function(req, res) {
    res.render('new');
});

// CREATE
app.post('/index', function(req, res) {
    Codes.create(req.body.userPost, function(err, callBackPost) {
        if(err) {
            console.log(err);
        } else {
            // console.log('Body Submited By: ' + req.body.moon);
            res.redirect('/index');
        }
    });
});

// SHOW
// app.post('/')

// EDIT

// DELETE
    
app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Server Start-coding-after-40 app has started');
});