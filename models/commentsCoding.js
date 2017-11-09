var mongoose        = require('mongoose');

var CodingCommentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('CodingCommentModel', CodingCommentSchema);