'use strict'

let AgentesModel = require("../../models/AgentesModel");
function AgentesController() {}

// GET /
AgentesController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        AgentesModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /:id
AgentesController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        AgentesModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /buscar
AgentesController.prototype.buscar_post = (busqueda) => {
    return new Promise((resolve, reject) => {
        AgentesModel.buscar(busqueda, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    });
}

// POST /
AgentesController.prototype.index_post = (clienteNuevo) => {
    console.log(AgentesModel);
    return new Promise((resolve, reject) => {
        AgentesModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    });
}

// PUT /
AgentesController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        AgentesModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    });
}

// DELETE /
AgentesController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        AgentesModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    });
}

module.exports = AgentesController;