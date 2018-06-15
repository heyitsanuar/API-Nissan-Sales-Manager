var mongoose = require("mongoose");

var modelSchema = new mongoose.Schema({
    modelo: String,
    descripcion: String,
    categoria: String,
    anio: Number,
    colores: {
        interior: [
            {
                nombre: String,
                codigo: String
            }
        ],
        exterior: [
            {
                nombre: String,
                codigo: String
            }
        ]
    },
    dimensiones: {
        largo: String,
        ancho: String,
        alto: String
    },
    variantes:[
        {
            variante: String,
            precio: String,
            caracteristicas: {
                rendimiento: Number,
                potencia: Number,
                torque: Number,
                transmision: String,
                traccion: String
            },
            meta: {
                active: {type: Boolean, default: true},
                created_at: {type: Date, default: Date.now},
                modified_at: {type: Date, default: Date.now}
            }
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