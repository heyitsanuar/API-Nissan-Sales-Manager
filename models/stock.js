var mongoose = require("mongoose");

var stockSchema = new mongoose.Schema({
    agency: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            refer: "Agency"
        },
        name: String
    },
    category: String,
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;