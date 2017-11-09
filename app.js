var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    ejs             = require('ejs'),
    mongoose        = require('mongoose'),
    methodOverRide  = require('method-override'),
    CodingComment   = require('./models/commentsCoding');
    
// CONFIGARATION
mongoose.connect('mongodb://localhost/coding-after-40');
app.use(bodyParser.urlencoded ({extended: true}));
app.set('view engine', 'ejs');      //__dirname reffer to the directory that the script is running 280 1:58
app.use(express.static(__dirname + '/public')); //used to be app.use(express.static('public')).. better to do it with __dirname
app.use(methodOverRide('_method'));

// MONGOOSE SETUP
var CodingSchema = new mongoose.Schema({
    title: String,
    body: String,
    create: {type: Date, default: Date.now},
        comments: [{
            // text: String,
            // author: String
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CodingCommentModel' //req.body.campComment in the POST comments sec in app.js
        }]
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
app.get('/index/:id', function(req,res) {
    Codes.findById(req.params.id).populate('comments').exec(function(err, callBackShow) {
        if(err) {
            console.log(err);
        } else {
            // console.log(req.params.id);
            res.render('show', {CBShow: callBackShow});
        }
    });
    
});

// EDIT
app.get('/index/:id/edit', function(req, res) {
    Codes.findById(req.params.id, function(err, callBackEdit) {
        if(err) {
            console.log(err);
        } else {
            // console.log(req.params.id);
            res.render('edit', {CBEdit: callBackEdit});
        }
    });
});

// UPDATE
app.put('/index/:id', function(req, res) {
    Codes.findByIdAndUpdate(req.params.id, req.body.userPost, function(err, callBackEdit) {
        if(err) {
            console.log(err);
        } else {
            // console.log(req.params.id);
            res.redirect('/index/' + callBackEdit._id);
        }
    });
});

// DELETE
app.delete('/index/:id', function(req,res) {
    Codes.findByIdAndRemove(req.params.id, function(err, callbackDelete) {
        if(err) {
            console.log(err);
        } else {
            // console.log(req.params.id);
            res.redirect('/index');
        }
    });
});

// ****************************** COMMENTS ********************************

// CREATE COMMENTS
app.get('/index/:id/comments/new', function(req, res) {
    Codes.findById(req.params.id, function(err, callbackComments) {
        if(err) {
            console.log(err);
        } else {
            // console.log('Body Submited By: ' + req.body.moon);
            res.render('comments/new', {comment: callbackComments});
        }
    });
});

// POST COMMENTS
app.post('/index/:id/comments', function(req, res) {
    Codes.findById(req.params.id, function(err, callBackPost) {
        if(err) {
            console.log(err);
        } else {
            CodingComment.create(req.body.userComment, function(err, callbackPostComment) {
                if(err) {
                    console.log(err);
                } else {
                    
                    // console.log('Body Submited By: ' + req.body.moon);
                    callBackPost.comments.push(callbackPostComment);
                    callBackPost.save();
                    console.log(callBackPost);
                    res.redirect('/index/' + callBackPost._id);
                }
            });
        }
    });
    
});

// EDIT COMMENTS

// UPDATE COMMENTS

// DELETE COMMENTS

    
app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Server Start-coding-after-40 app has started');
});