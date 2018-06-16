'use strict'

let ClientesModel = require("../../models/ClientesModel");
function ClientesController() {}

// GET /
ClientesController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        ClientesModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /:id
ClientesController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        ClientesModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    });
}

// GET /buscar
ClientesController.prototype.buscar_post = (busqueda) => {
    return new Promise((resolve, reject) => {
        ClientesModel.buscar(busqueda, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    });
}

// POST /
ClientesController.prototype.index_post = (clienteNuevo) => {
    console.log(ClientesModel);
    return new Promise((resolve, reject) => {
        ClientesModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    });
}

// PUT /
ClientesController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        ClientesModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    });
}

// DELETE /
ClientesController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        ClientesModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    });
}

module.exports = ClientesController;