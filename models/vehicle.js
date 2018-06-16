var mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
    model: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Model"
        },
        name: String,
        version: String,
        category: String
    },
    serieNumber: String,
    agency: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Agency"
        },
        name: String
    },
    status: {type: String, default: "Available"},
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;