var mongoose = require("mongoose");

var branchSchema = new mongoose.Schema({
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
        name: String
    },
    meta: {
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date}
    }
});

var Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;