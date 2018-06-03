var mongoose = require("mongoose");

var agencySchema = new mongoose.Schema({
    name: String,
    region: String,
    city: String,
    cp: Number,
    colony: String,
    address: String,
    manager: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "User"
        },
        fullName: String
    },
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date}
    }
});

var Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;