const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/notificacionesdb')
.then(db => console.log('BD esta conectada'))
.catch(err => console.error(err));
//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

//Routes
app.use('/medios', require('./routes/medio'))
app.use('/plantillas', require('./routes/plantilla'))
app.use('/notificaciones', require('./routes/notificacion'))
app.use('/predeterminados', require('./routes/predeterminado'))

// Static files
app.use(express.static(__dirname + '/public'))


//server is listening
app.listen(app.get('port'), () => {
 console.log('server on port 3000');
});