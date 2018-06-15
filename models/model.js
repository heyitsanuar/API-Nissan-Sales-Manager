var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
    modelo: String,
    descripcion: String,
    categoria: String,
    anio: Number,
    colores: [String],
    dimensiones: {
        largo: String,
        ancho: String,
        alto: String
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