var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
    modelo: String,
    descripcion: String,
    categoria: String,
    anio: Number,
    colores: {
        inner: [String],
        outer: [String]
    },
    dimensiones: {
        largo: Number,
        ancho: Number,
        alto: Number
    },
    variantes:[
        {
            variante: String,
            precio: Number,
            caracteristicas: {
                rendimiento: Number,
                potencia: Number,
                torque: Number,
                transmisión: String,
                tracción: String
            }
        }
    ],
    imagenes: {
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