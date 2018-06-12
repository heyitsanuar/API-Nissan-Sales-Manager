var mongoose = require("mongoose");

var versionSchema = new mongoose.Schema({
    modelo: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            refer: "Model"
        },
        nombre: String
    },
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
});

var Version = mongoose.model("Version", versionSchema);

module.exports = Version;