const { Router } = require('express');
const path = require('path');
const multer = require('multer')
const controladorTipos = require('../controladores/Tipos');
const { ValidarAutendicado } = require('../configuraciones/passport');
const { body, query, validationResult } = require('express-validator');

const storageTipos = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/img/tipos'));
    },
    filename: function(req, file, cb){
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + nombreUnico + '-' + file.mimetype.replace('/','.'));
    } 
});
const uploadTipos = multer({storage: storageTipos});

const rutas = Router();

rutas.get('/', controladorTipos.Inicio);
rutas.get('/listar', controladorTipos.Listar);
rutas.get('/buscarid', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
controladorTipos.BuscarId);

rutas.get('/buscarnombre', 
query('nombre').isLength({min:3, max: 50}).withMessage('El nombre del tipo debe tener mas de 3 caracteres'),
controladorTipos.BuscarNombre);

rutas.post('/guardar', 
body('nombre').isLength({min:3, max: 50}).withMessage('El nombre del tipo debe tener mas de 3 caracteres'),
controladorTipos.Guardar);

rutas.put('/editar', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
body('nombre').isLength({min:3, max: 50}).withMessage('El nombre del tipo debe tener mas de 3 caracteres'),
controladorTipos.Editar);

rutas.delete('/eliminar', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
controladorTipos.Eliminar);

rutas.post('/imagen',
uploadTipos.single('img'), 
controladorTipos.RecibirImagen);

module.exports= rutas;