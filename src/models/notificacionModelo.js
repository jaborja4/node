const mongoose = require('mongoose');
const { Schema } = mongoose;

const Notificacion = new Schema({
    cod_emisor: {
        type: String
    },
    cod_curso: {
        type: String
    },
    cod_plantilla: {
        type: String
    },
    cod_medio: {
        type: String
    },
    cod_alumno: {
        type: String
    },
    estado: {
        type: String
    },
    mensaje: {
        type: String
    },
    fecha_entrega: {
        type: Date
    },
    datos:[]

});

module.exports = mongoose.model('Notificacion', Notificacion);
