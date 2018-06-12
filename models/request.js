var mongoose = require("mongoose");

var requestSchema = new mongoose.Schema({
    vehicle: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Vehicle"
        },
        name: String,
        version: String,
        serieNumber: String
    },
    agencies: {
        origin: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                refer: "Agency"
            },
            name: String
        },
        destiny: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                refer: "Agency"
            },
            name: String
        }
    },
    users: {
        emitter: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                refer: "User"
            },
            username: String
        },
        receiver: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                refer: "User"
            },
            username: String
        }
    },
    client: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Client"
        },
        name: String
    },
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var Request = mongoose.model("Request", requestSchema);

module.exports = Request;