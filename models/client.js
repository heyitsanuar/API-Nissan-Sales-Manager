var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone: String,
    email: String,
    cp: String,
    address: String,
    colony: String,
    region: String,
    city: String,
    meta: {
        active: Boolean,
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date}
    }
});

var Client = mongoose.model("Model", clientSchema);

module.exports = Client;