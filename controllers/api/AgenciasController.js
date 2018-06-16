'use strict'

let AgenciasModel = require("../../models/AgenciasModel");
function AgenciasController() {}

// GET /
AgenciasController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        AgenciasModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /:id
AgenciasController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        AgenciasModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /buscar
AgenciasController.prototype.buscar_post = (busqueda) => {
    return new Promise((resolve, reject) => {
        AgenciasModel.buscar(busqueda, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    });
}

// POST /
AgenciasController.prototype.index_post = (clienteNuevo) => {
    console.log(AgenciasModel);
    return new Promise((resolve, reject) => {
        AgenciasModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    });
}

// PUT /
AgenciasController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        AgenciasModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    });
}

// DELETE /
AgenciasController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        AgenciasModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    });
}

module.exports = AgenciasController;