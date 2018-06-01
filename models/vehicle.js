var mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
    name: String,
    model: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Model"
        },
        name: String
    },
    serieNumber: String,
    branch: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "Branch"
        },
        name: String
    },
    status: String,
    meta: {
        active: Boolean,
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date}
    }
});

var Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;