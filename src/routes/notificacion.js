const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Notificacion = require('../models/notificacionModelo');
const Plantilla = require('../models/plantillaModelo');

router.post('/', async (req, res) => {
    var jsonObjIn = req.body;
    var jsonPlantilla;
    var jsonObjOut=req.body;

    await Plantilla.findOne({ _id: jsonObjIn["cod_plantilla"] }, (err, plantilla) => {
        if (err) plantilla["error"]='error al realizar la peticion';
        if (!plantilla) plantilla["error"]='error al realizar la peticion';;
        jsonPlantilla=plantilla;
    });

    var mensaje=" ";
    var arrMensaje=jsonPlantilla.mensaje.split(" ");
    for(var i=0;i<arrMensaje.length;i++){
       if(arrMensaje[i]=="*"){
            for(var j=0;jsonPlantilla.variables.length;j++){
                for(var z=0;jsonObjIn.datos.length;z++){
                    if(jsonPlantilla.variables[j].nombre==jsonObjIn.datos[z].variable){
                        if(jsonPlantilla.variables[j].posicion==i){
                            mensaje+=jsonObjIn.datos[z].valor+" ";
                        }
                    }
                }
            }
       }
       else{
        mensaje+=arrMensaje[i]+" ";
       }
    }

    jsonObjOut["mensajes"]=mensaje;


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'notificacionesarquitectura@gmail.com',
            pass: 'Jaborja.5635'
        }
    });
    var mailOptions = {
        from: 'Remitente',
        to: 'joelito93alexander@gmail.com',
        subject: 'Asunto',
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });

    const notificacion = new Notificacion(jsonObjOut);
    await notificacion.save((err, notificacion) => {
        if (err) return res.status(500).send();
        if (!notificacion) return res.status(400).send();
        res.status(200).send({menssage:mensaje});
    }
    );
});

router.get('/', async (req, res) => {
    const notificacion = await Notificacion.find(
        (err, notificacion) => {
            if (err) return res.status(500).send();
            if (!notificacion) return res.status(400).send();
            res.status(200).json(notificacion);
        }
    );
});

router.get('/alumno/:id', async (req, res) => {
    let id = req.params.id
    await Notificacion.find({ cod_alumno: id }, (err, notificacion) => {
        if (err) return res.status(500).send();
        if (!notificacion) return res.status(400).send();
        res.status(200).json(notificacion);
    });
});

router.get('/emisor/:id', async (req, res) => {
    let id = req.params.id
    await Notificacion.find({ cod_emisor: id }, (err, notificacion) => {
        if (err) return res.status(500).send();
        if (!notificacion) return res.status(400).send();
        res.status(200).json(notificacion);
    });
});


module.exports = router;