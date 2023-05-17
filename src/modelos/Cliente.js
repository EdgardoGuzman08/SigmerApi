const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Cliente = db.define(
    'Cliente',
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3,50],
                isAlpha: true,
            }
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                len: [3,50],
                isAlpha: true,
            }
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate:{
                is: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
            },
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
    },
    {
        tableName: 'clientes'
    },
);
module.exports = Cliente;