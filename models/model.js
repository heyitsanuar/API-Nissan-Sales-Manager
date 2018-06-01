var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    colors: {
        inner: [
            {
                name: String,
                code: String
            }
        ],
        outer: [
            {
                name: String,
                code: String
            }
        ]
    },
    variants:[
        {
            description: String,
            cost: String,
            torque: String,
            maxSpeed: String,
            dimensions: {
                height: Number,
                width: Number,
                length: Number
            },
            seats: Number,
            doors: Number,
            fuel: String,
            yield: String,
            airBags: Boolean,
            gasTankCapacity: String,
            hp: Number,
            displacement: Number
        }
    ],
    photos: {
        bannerImageURL: String,
        imagesURL: [String]
    },
    meta: {
        active: Boolean,
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date}
    }
});

var Model = mongoose.model("Model", modelSchema);

module.exports = Model;