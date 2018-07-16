const mongoose = require('mongoose');
const { Schema } = mongoose;

const Medio = new Schema({
    nombre: {
        type: String
    },
    estado: {
        type: String
    }   
});

module.exports = mongoose.model('Medio', Medio);