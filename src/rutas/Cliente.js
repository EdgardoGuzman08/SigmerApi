const { Router } = require('express');
const controladorClientes = require('../controladores/Cliente');
const { body, query } = require('express-validator');
const rutas = Router();

rutas.get('/', controladorClientes.Inicio);
rutas.get('/listar', controladorClientes.Listar);

rutas.post('/guardar', 
body('nombre').isLength({min:3, max: 50}).withMessage('El nombre del Cliente debe tener mas de 3 caracteres'),
body('apellido').isLength({min:3, max: 50}).withMessage('El apellido del Cliente debe tener mas de 3 caracteres'),
controladorClientes.Guardar);

rutas.put('/editar', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
body('nombre').isLength({min:3, max: 50}).withMessage('El nombre del Cliente debe tener mas de 3 caracteres'),
body('apellido').isLength({min:3, max: 50}).withMessage('El apellido del Cliente debe tener mas de 3 caracteres'),
controladorClientes.Editar);

rutas.delete('/eliminar', 
query('id').isInt().withMessage('Solo se permiten valores enteros'),
controladorClientes.Eliminar);

module.exports= rutas;