var mongoose        = require('mongoose');

var CodingSchema = new mongoose.Schema({
    title: String,
    body: String,
    create: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    username: String
  },
    comments: [{
        // text: String,
        // author: String
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodingCommentModel' //req.body.campComment in the POST comments sec in app.js
    }]
});

// var Codes = mongoose.model('codingAfter40', CodingSchema);
module.exports = mongoose.model('codingAfter40', CodingSchema);