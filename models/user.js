var mongoose                = require('mongoose');
var passportLocalMongoose   = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
    //we dont need to define UserUnitialize.. or User.denitialize.. mogoose doing it for us, we using the one that come with local-mongoose
    
module.exports = mongoose.model('User', UserSchema);