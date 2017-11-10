var mongoose        = require('mongoose');

var CodingCommentSchema = new mongoose.Schema({
    text: String,
    // author: String
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('CodingCommentModel', CodingCommentSchema);