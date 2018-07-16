const express = require('express');
const router = express.Router();

const Medio = require('../models/medioModelo');

router.get('/', async (req, res) => {
    const medios = await Medio.find((err, medio) => {
        if (err) return res.status(500).send();
        if (!medio) return res.status(400).send();
        res.status(200).json(medio);
    });
});

router.get('/:id', async (req, res) => {
    let id = req.params.id
    await Medio.findOne({ _id: id }, (err, medio) => {
        if (err) return res.status(500).send();
        if (!medio) return res.status(400).send();
        res.status(200).json(medio);
    });
});

router.put('/', async (req, res) => {
    const medio = new Medio(req.body);
    await medio.save((err, medio) => {
            if (err) return res.status(500).send();
            if (!medio) return res.status(400).send();
            res.status(200).send();
        }
    );
});

router.post('/', async (req, res) => {
    let medio = await Medio.findOne({ _id: req.body._id })
    Object.assign(medio, req.body)
    await medio.save((err, medio) => {
            if (err) return res.status(500).send();
            if (!medio) return res.status(400).send();
            res.status(200).send();
        }
    );
});

router.delete('/:id', async (req, res) => {
    await Medio.findByIdAndRemove(req.params.id, (err, medio) => {
        if (err) return res.status(500).send();
        if (!medio) return res.status(400).send();
        res.status(200).send();
    });
});

module.exports = router;