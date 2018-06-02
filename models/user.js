var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    user: String,
    password: String,
    name: String,
    surname: String,
    role: String,
    meta: {
        active: Boolean,
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date}
    }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;