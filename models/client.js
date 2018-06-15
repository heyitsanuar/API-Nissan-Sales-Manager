var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone: Number,
    email: String,
    state: String,
    city: String,
    cp: String,
    address: String,
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var Client = mongoose.model("Client", clientSchema);

module.exports = Client;