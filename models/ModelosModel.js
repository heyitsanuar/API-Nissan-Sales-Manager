var mongoose = require("mongoose");

var ModelosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    colores: {
        type: {
            interior: {
                type: [{
                    nombre: {
                        type: String,
                        required: false
                    },
                    codigo: {
                        type: String,
                        required: false
                    }
                }],
                required: true
            },
            exterior: {
                type: [{
                    nombre: {
                        type: String,
                        required: false
                    },
                    codigo: {
                        type: String,
                        required: false
                    }
                }],
                required: true
            },
        },
        required: true
    },
    dimensiones: {
        type: {
            alto: Number,
            ancho: Number,
            largo: Number
        },
        required: true
    },
    imagenes: {
        type: {
            urls: {
                type: [String],
                required: false
            },
            banner: {
                type: String,
                required: true
            }
        },
        required: true
    },
    variantes: {
        type: [{
            nombre: {
                type: String,
                required: true
            },
            precio: {
                type: Number,
                required: true
            },
            caracteristicas: {
                type: {
                    AireAcondicionado: {
                        type: Boolean,
                        required: true
                    },
                    Puertas: {
                        type: Number,
                        required: true
                    },
                    Quemacocos: {
                        type: Boolean,
                        required: true
                    },
                    Convertible: {
                        type: Boolean,
                        required: true
                    },
                    Rendimiento: {
                        type: Number,
                        required: true
                    },
                    Potencia: {
                        type: Number,
                        required: true
                    },
                    Torque: {
                        type: Number,
                        required: true
                    },
                    Transmision: {
                        type: String,
                        required: true
                    },
                    Traccion: {
                        type: String,
                        required: true
                    },
                },
                required: true
            }
        }],
        required: false
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
ModelosSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
ModelosSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("administrador").populate("agentes").exec(callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
ModelosSchema.statics.buscar = function(busqueda, callback) {
    busqueda["meta.activo"] = true;
    console.log(JSON.stringify(busqueda));
    return this.find(busqueda, callback);
}

// Ingresa un nuevo documento a la coleccion
ModelosSchema.statics.crear = function(cliente, callback) {
    return this.create(cliente, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
ModelosSchema.statics.guardar = function(id, cliente, callback) {
    console.log(id);
    return this.findOneAndUpdate(
        {
            "_id": id,
            "meta.activo": true
        },
        cliente,
        { new: true },
        callback
    );
}

// Elimina lógicamente el registro
ModelosSchema.statics.eliminar = function(id, callback) {
    return this.findOneAndUpdate(
        { 
            "_id": id,
            "meta.activo": true
        },
        { "meta.activo": false },
        { new: true },
        callback
    );
}

var Modelos = mongoose.model("Modelos", ModelosSchema);

module.exports = Modelos;