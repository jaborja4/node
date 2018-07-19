const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const http = require('http');
const Notificacion = require('../models/notificacionModelo');
const Plantilla = require('../models/plantillaModelo');
const Predeterminado = require('../models/predeterminadoModelo');


router.post('/', async (req, res) => {
    var jsonObjIn = req.body;
    var jsonPlantilla;
    var jsonObjOut=req.body;

    await Plantilla.findOne({ nombre: jsonObjIn["cod_plantilla"] }, (err, plantilla) => {
        if (err) plantilla["error"]='error al realizar la peticion';
        if (!plantilla) plantilla["error"]='error al realizar la peticion';;
        jsonPlantilla=plantilla;
    });
    var mensaje=" ";
    var arrMensaje=jsonPlantilla.mensaje.split(" ");
    for(var i=0;i<arrMensaje.length;i++){
       if(arrMensaje[i]=="*"){
            for(var j=0;j<jsonPlantilla.variables.length;j++){
                for(var z=0;z<jsonObjIn.datos.length;z++){
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

    


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'notificacionesarquitectura@gmail.com',
            pass: 'Jaborja.5635'
        }
    });
    var mailOptions = {
        from: 'Remitente',
        to: jsonObjIn["mail_alumno"],
        subject: jsonObjIn["asunto"],
        text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            jsonObjOut["estado"]="error";
        } else {
            jsonObjOut["estado"]="entregada";
        }
    });

    jsonObjOut["mensaje"]=mensaje;
    jsonObjOut["fecha_entrega"]=new Date();

    const notificacion = new Notificacion(jsonObjOut);
    await notificacion.save((err, notificacion) => {
        if (err) return res.status(500).send();
        if (!notificacion) return res.status(400).send();
        res.status(200).send({menssage:mensaje});
    }
    );
});

router.post('/sms', async (req, res) => {
    var jsonObjIn = req.body;
    var jsonPlantilla;
    var jsonObjOut=req.body;

    await Plantilla.findOne({ nombre: jsonObjIn["cod_plantilla"] }, (err, plantilla) => {
        if (err) plantilla["error"]='error al realizar la peticion';
        if (!plantilla) plantilla["error"]='error al realizar la peticion';;
        jsonPlantilla=plantilla;
    });
    var mensaje=" ";
    var arrMensaje=jsonPlantilla.mensaje.split(" ");
    for(var i=0;i<arrMensaje.length;i++){
       if(arrMensaje[i]=="*"){
            for(var j=0;j<jsonPlantilla.variables.length;j++){
                for(var z=0;z<jsonObjIn.datos.length;z++){
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

    var post_data = querystring.stringify({
      'cmd' : 'sendsms',
      'domainId' : 'test',
      'login': 'ircalero',
      'passwd': 'ujts8hr9',
      //'dest' : '593'+jsonObjIn["mail_alumno"].substring(1),
      'dest' : '593998839295',
      'msg' : mensaje
  });

  // Un objeto de opciones sobre donde se envia el post
  var post_options = {
      host: 'www.altiria.net',
      port: '80',
      path: '/sustituirPOSTsms',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Se efectua la petición
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          //Es necesario procesar la respuesta y los posibles errores
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
  jsonObjOut["mensaje"]=mensaje;
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

router.get('/receptor/:id', async (req, res) => {
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