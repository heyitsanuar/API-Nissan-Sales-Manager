let express = require("express");
let formateador = require("../controllers/modules/responseFormatter");
let AgenciasController = require("../controllers/api/AgenciasController");

var router = express.Router();
var controller = new AgenciasController();

router.get("/", (req, res) => {
    controller.index_get()
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});

router.get("/:id", (req, res) => {
    controller.id_get(req.params.id)
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});

router.post("/", (req, res) => {
    controller.index_post(req.body)
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
        .catch((err) => {
            res.status(500).json(formateador(false, err));
        })
    });
    
router.post("/buscar", (req, res) => {
    controller.buscar_post(req.body)
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});
    
router.put("/:id", (req, res) => {
    controller.index_put(req.params.id, req.body)
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});

router.delete("/:id", (req, res) => {
    controller.index_delete(req.params.id, req.body)
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});

module.exports = router;