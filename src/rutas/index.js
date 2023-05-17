const { Router } = require('express');
const controladorUsuario = require('../controladores/Usuarios');
const rutas = Router();

rutas.get('/', controladorUsuario.Inicio);

module.exports= rutas;