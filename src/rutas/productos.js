const { Router } = require('express');
const controladorProducto = require('../controladores/productos');
const { body, query } = require('express-validator');

const rutas = Router();

rutas.get('/', controladorProducto.Inicio);
rutas.get('/listar', controladorProducto.Listar);

rutas.post('/guardar', 
body('nombre').isLength({min:3, max: 50}).withMessage('El nombre del producto debe tener mas de 3 caracteres'),
controladorProducto.Guardar);

rutas.put('/editar', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
body('nombre').isLength({min:3, max: 50}).withMessage('El nombre del producto debe tener mas de 3 caracteres'),
controladorProducto.Editar);

rutas.delete('/eliminar', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
controladorProducto.Eliminar);

module.exports= rutas;