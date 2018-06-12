var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
    modelo: String,
    descripcion: String,
    categoria: String,
    anio: Number,
    colores: {
        interior: [String],
        exterior: [String]
    },
    dimensiones: {
        largo: Number,
        ancho: Number,
        alto: Number
    },
    variantes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Version"
        }
    ],
    imagenes: [String],
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