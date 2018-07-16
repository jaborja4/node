const express = require('express');
const router = express.Router();

const Plantilla = require('../models/plantillaModelo');

router.get('/', async (req, res) => {
    const plantilla = await Plantilla.find((err, plantilla) => {
        if (err) return res.status(500).send();
        if (!plantilla) return res.status(400).send();
        res.status(200).json(plantilla);
    });

});

router.get('/:id', async (req, res) => {
    let id = req.params.id
    await Plantilla.findOne({ _id: id }, (err, plantilla) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' });
        if (!plantilla) return res.status(404).send({ mesagge: ' la plantilla no exiten' });
        res.json(plantilla);
    });
});

router.put('/', async (req, res) => {
    var jsonIn=req.body;
    //if(jsonIn)
    const plantilla = new Plantilla(req.body);
    await plantilla.save(
        (err, plantilla) => {
            if (err) return res.status(500).send();
            if (!plantilla) return res.status(400).send();
            res.status(200).send();
        }
    );
});

router.post('/', async (req, res) => {
    let plantilla = await Plantilla.findOne({ _id: req.body._id })
    Object.assign(plantilla, req.body)
    await plantilla.save(
        (err, plantilla) => {
            if (err) return res.status(500).send();
            if (!plantilla) return res.status(400).send();
            res.status(200).send();
        }
    );
});


router.delete('/:id', async (req, res) => {
    await Plantilla.findByIdAndRemove(req.params.id, (err, plantilla) => {
        if (err) return res.status(500).send();
        if (!plantilla) return res.status(400).send();
        res.status(200).send();
    });
});

module.exports = router;