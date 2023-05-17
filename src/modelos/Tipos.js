const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const Tipo = db.define(
    'Tipo',
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
            unique: {arg: true, msg:'No se puede repetir nombres'},
            validate:{
                len: [3,10],
            }
        },
        imagen: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
    },
    {
        tableName: 'tipos'
    },
);
module.exports = Tipo;