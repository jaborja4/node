const mongoose = require('mongoose');
const { Schema } = mongoose;

const Plantilla = new Schema ({
    nombre: {
        type: String
    },
    estado: {
        type: String
    },
    mensaje: {
        type: String
    },
    variables:[] 
});

module.exports = mongoose.model('Plantilla', Plantilla);
