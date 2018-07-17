const express = require('express');
const router = express.Router();

const Predeterminado = require('../models/predeterminadoModelo');

router.get('/', async (req, res) => {
    const predeterminado = await Predeterminado.find((err, predeterminado) => {
        if (err) return res.status(500).send();
        if (!predeterminado) return res.status(400).send();
        res.status(200).json(predeterminado);
    });
});


router.put('/', async (req, res) => {
    const predeterminado = new Predeterminado(req.body);
    await predeterminado.save((err, predeterminado) => {
            if (err) return res.status(500).send();
            if (!predeterminado) return res.status(400).send();
            res.status(200).send();
        }
    );
});

router.post('/', async (req, res) => {
    let predeterminado = await Predeterminado.findOne({ _id: req.body._id })
    Object.assign(predeterminado, req.body)
    await predeterminado.save((err, predeterminado) => {
            if (err) return res.status(500).send();
            if (!predeterminado) return res.status(400).send();
            res.status(200).send();
        }
    );
});

module.exports = router;