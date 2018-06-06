var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    colors: {
        inner: [String],
        outer: [String]
    },
    versions:[
        {
            name: String,
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
        active: {type: Boolean, default: true},
        created_at: {type: Date, default: Date.now},
        modified_at: {type: Date, default: Date.now}
    }
});

var CarModel = mongoose.model("CarModel", modelSchema);

module.exports = CarModel;