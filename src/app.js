const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const db = require('./configuraciones/db');
const Modelos = require('./modelos');
//inicio del servidor   
const app = express();
app.set('port', 1301);
app.use(morgan('combined'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/', require('./rutas/'));
app.use('/api/imagenes/', express.static(path.join(__dirname, 'public/img'))); //definimos la ruta de las imagenes estaticas
app.use('/api/tipos/', require('./rutas/Tipos'));
app.use('/api/usuarios/', require('./rutas/Usuarios'));
app.use('/api/clientes/', require('./rutas/Cliente'));
app.use('/api/productos/', require('./rutas/productos'));
app.use('/api/autenticacion/', require('./rutas/Autenticacion'));
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
    db.authenticate().then(()=>{
        console.log('se ha establecido la conexion a la bd');
        Modelos.CrearModelos();
    })
    .catch((error)=>{
        console.log('error al conectar la bd');
        console.error(error);
        //console.log(error);
    })

});
