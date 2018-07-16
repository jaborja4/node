const mongoose = require('mongoose');
const { Schema } = mongoose;

const Medio = new Schema({
    nombre: {
        type: String
    },
    id_plantilla: {
        type: String
    }   
});

module.exports = mongoose.model('Predeterminado', Medio);