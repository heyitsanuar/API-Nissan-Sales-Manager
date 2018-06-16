var mongoose = require("mongoose");

var RolesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});

// Obtiene todos los clientes
RolesSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

var Roles = mongoose.model("Roles", RolesSchema);

module.exports = Roles;