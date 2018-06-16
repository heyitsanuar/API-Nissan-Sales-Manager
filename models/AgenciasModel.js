var mongoose = require("mongoose");

var AgenciasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    cp: {
        type: String,
        required: true
    },
    domicilio: {
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
    administrador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agentes",
        required: false
    },
    agentes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Agentes",
        required: false
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
AgenciasSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
AgenciasSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("administrador").populate("agentes").exec(callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
AgenciasSchema.statics.buscar = function(busqueda, callback) {
    busqueda["meta.activo"] = true;
    console.log(JSON.stringify(busqueda));
    return this.find(busqueda, callback);
}

// Ingresa un nuevo documento a la coleccion
AgenciasSchema.statics.crear = function(cliente, callback) {
    return this.create(cliente, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
AgenciasSchema.statics.guardar = function(id, cliente, callback) {
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
AgenciasSchema.statics.eliminar = function(id, callback) {
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

var Agencias = mongoose.model("Agencias", AgenciasSchema);

module.exports = Agencias;