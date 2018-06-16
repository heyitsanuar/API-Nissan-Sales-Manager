'use strict'

let ModelosModel = require("../../models/ModelosModel");
function ModelosController() {}

// GET /
ModelosController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        ModelosModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /:id
ModelosController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        ModelosModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /buscar
ModelosController.prototype.buscar_post = (busqueda) => {
    return new Promise((resolve, reject) => {
        ModelosModel.buscar(busqueda, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    });
}

// POST /
ModelosController.prototype.index_post = (clienteNuevo) => {
    console.log(ModelosModel);
    return new Promise((resolve, reject) => {
        ModelosModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    });
}

// PUT /
ModelosController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        ModelosModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    });
}

// DELETE /
ModelosController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        ModelosModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    });
}

module.exports = ModelosController;