const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    'Usuario',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        login: {
            type: DataTypes.STRING(50), allowNull: false,
            unique: {
                arg: true,
                msg: 'El login ya se encuentra asignado'
            },
            validate: {
                len: [3, 50],
            },
        },
        contrasena: { type: DataTypes.STRING(250), allowNull: false, },
        correo: {
            type: DataTypes.STRING(50), allowNull: false,
            unique: {
                arg: true,
                msg: 'El correo ya se encuentra asignado'
            },
            validate: {
                isEmail: true,
            },
        },
        codigo: { type: DataTypes.STRING(10), allowNull: true, defaultValue: '0000' },
        fallido: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        estado: { type: DataTypes.ENUM('AC', 'IN', 'BL'), allowNull: true, defaultValue: 'AC' },
    },
    {
        tableName: 'usuarios',
        hooks: {
            beforeCreate(usuario) {
                const hash = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena = hash;
            },
            beforeUpdate(usuario) {
                if (usuario.contrasena) {
                    const hash = bcrypt.hashSync(usuario.contrasena, 10);
                    usuario.contrasena = hash;
                }
                if(usuario.fallido>=5)
                    usuario.estado='BL';
            },
        }
    }
);
Usuario.prototype.VerificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
};
module.exports = Usuario;