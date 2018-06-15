"use strict";

let mongodb = require("mongodb").MongoClient;

function SharedModels() {}
    SharedModels.prototype.getModels = () => {
        let promise = new Promise(function(resolve, reject) {
            // let url = "mongodb://casabi.ddns.net:5000,casabi.ddns.net:5001,casabi.ddns.net:5002,casabi.ddns.net:5003/nissan?replicaSet=repl0&readPreference=secondary";
            let url = "mongodb://anuar:taquitos21@ds245250.mlab.com:45250/nissan";
            mongodb.connect(url)
                .then((client) => {
                    let db = client.db();
                    let proyection = {
                        "modelo": 1,
                        "categoria": 1,
                        "dimensiones": 1,
                        "variantes": 1,
                        "imagenes": 1,
                        "variantes.caracteristicas": 1,
                        "variantes.variante": 1,
                        "variantes.precio": 1,
                        "_id": 0
                    };
                    // console.log(proyection);
                    db.collection("carmodels").find({}).project(proyection).toArray()
                        .then((result) => {
                            // console.log(result);
                            resolve(result)
                            client.close();
                        })
                        .catch((err) => {
                            reject(err);
                            client.close();
                        });
                })
                .catch((err) => {
                    reject(err)
                    client.close();
                })
        });
        return promise;
}

module.exports = SharedModels;