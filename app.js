var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverRide  = require('method-override'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Codes          = require('./models/coding'),
    CodingComment   = require('./models/commentsCoding');
    
// CONFIGARATION
mongoose.connect('mongodb://localhost/coding-after-40');
app.use(bodyParser.urlencoded ({extended: true}));
app.set('view engine', 'ejs');      //__dirname reffer to the directory that the script is running 280 1:58
app.use(express.static(__dirname + '/public')); //used to be app.use(express.static('public')).. better to do it with __dirname
app.use(methodOverRide('_method'));

//PASSOPRT CONFIGARATION
app.use(require('express-session')({
    secret: 'Moon App Good Nice',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); //setting passport up to work in the application
app.use(passport.session()); //setting passport up to work in the application

passport.use(new LocalStrategy(User.authenticate())); //coming from passportLocalMongoose in user.js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUserMoon = req.user; // req.user has the id like 123kr312 and the username like buzz
    next();
});     //whatever we put in res.local will be availble inside out temlates

// MONGOOSE SETUP
// // var CodingSchema = new mongoose.Schema({
// //     title: String,
// //     body: String,
// //     create: {type: Date, default: Date.now},
// //         comments: [{
// //             // text: String,
// //             // author: String
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: 'CodingCommentModel' //req.body.campComment in the POST comments sec in app.js
// //         }]
// });

// var Codes = mongoose.model('codingAfter40', CodingSchema);

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
app.get('/index/:id/comments/:comment_id/edit', function(req, res) {
    CodingComment.findById(req.params.comment_id, function(err, callBackCommentEdit) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/edit', {PostIdEdit: req.params.id, commentEdit: callBackCommentEdit});
        }
    });
});

// UPDATE COMMENTS
app.put('/index/:id/comments/:comment_id', function(req, res) {
    CodingComment.findByIdAndUpdate(req.params.comment_id, req.body.userComment, function(err, callBackEdit) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/index/' + req.params.id);
        }
    });
});

// DELETE COMMENTS
app.delete('/index/:id/comments/:comment_id', function(req, res) {
    CodingComment.findByIdAndRemove(req.params.comment_id, function(err, callBack) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/index/' + req.params.id);
        }
    });
});

// REGISTER
app.get('/register', function(req, res) {
    res.render('register')
});
    
app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Server Start-coding-after-40 app has started');
});