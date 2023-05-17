const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Producto = db.define(
    'producto',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate:{
                len:[3,50],
            }
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: '1',
        },
        categoria: {
            type: DataTypes.ENUM('GE','EL','IN', 'PR'),
            allowNull: true,
            defaultValue: 'GE',
        },
    },
    {
        tableName: 'productos',
    },
);
module.exports = Producto;