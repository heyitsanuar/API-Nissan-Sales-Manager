var mongoose = require("mongoose");

var ClienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidoP: {
        type: String,
        required: true
    },
    apellidoM: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cp: {
        type: Number,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    agencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agencias",
        required: false
    },
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agente",
        required: false
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
ClienteSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
ClienteSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("agencia").populate("agente").exec(callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
ClienteSchema.statics.buscar = function(busqueda, callback) {
    busqueda["meta.activo"] = true;
    console.log(JSON.stringify(busqueda));
    return this.find(busqueda, callback);
}

// Ingresa un nuevo documento a la coleccion
ClienteSchema.statics.crear = function(cliente, callback) {
    return this.create(cliente, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
ClienteSchema.statics.guardar = function(id, cliente, callback) {
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
ClienteSchema.statics.eliminar = function(id, callback) {
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

var Clientes = mongoose.model("Clientes", ClienteSchema);

module.exports = Clientes;