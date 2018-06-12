var mongoose = require("mongoose");

var saleSchema = new mongoose.Schema({
    vehicle: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            refer: "Vehicle"
        },
        name: String,
        version: String,
        serieNumber: String
    },
    client: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Client"
        },
        name: String
    },
    salesman: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "User"
        },
        username: String
    },
    agency: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Agency"
        },
        name: String
    },
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;