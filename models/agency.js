var mongoose = require("mongoose");

var agencySchema = new mongoose.Schema({
    name: String,
    state: String,
    city: String,
    cp: Number,
    address: String,
    manager: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "User"
        },
        fullName: String
    },
    employees: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                refer: "User"
            },
            fullName: String,
            phone: String,
            email: String,
            address: String
        }
    ],
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;