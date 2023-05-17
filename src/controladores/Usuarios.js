const Usuario = require('../modelos/Usuarios');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');

exports.Inicio = (req, res)=>{
    const moduloUsuario ={
        modulo: 'usuario',
        descripcion: 'Contiene la informacion de los usuarios',
        rutas:[
            {
                ruta: '/api/usuarios/listar',
                descripcion: 'Lista los usuarios',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/usuarios/guardar',
                descripcion: 'Guarda los usuario',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/usuarios/editar',
                descripcion: 'Modifica los usuarios',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/usuarios/eliminar',
                descripcion: 'Eliminar los usuarios',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    } 
    MSJ('Peticion Usuario ejecutada correctamente',  200, moduloUsuario, [], res);
}

exports.Listar = async (req, res) =>{
    const listaUsuario = await Usuario.findAll();
    console.log(listaUsuario);
    MSJ('Peticion Usuario Listar ejecutada correctamente',  200, listaUsuario, [], res);
}

exports.Guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { login, contrasena, correo, ClienteId } = req.body;
        if(!login || !contrasena || !correo || !ClienteId){
            const er = {
                msj: 'Debe escribir los datos del usuario correctamente',
                parametro: 'login, contrasena, correo, ClienteId'
            }
            MSJ('Peticion Guardar Usuario ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Usuario.create({
                login: login,
                contrasena: contrasena,
                correo: correo,
                ClienteId: ClienteId
            }).then((data)=>{
                console.log(data);
                MSJ('Peticion Guardar Usuario ejecutada correctamente',  200, data, [], res);
            }).catch((err) =>{
                var er='';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                });
                MSJ('Peticion Guardar usuario ejecutada correctamente',  200, [], {msj: er}, res);
            });
        }
    }
}

exports.Editar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Editar Usuario ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        const { login,  contrasena, correo, ClienteId} = req.body;
        if(!id || !login || !contrasena || !correo || !ClienteId){
            const er = {
                msj: 'Debe escribir el id del usuario',
                parametro: 'id'
            }
            MSJ('Peticion Editar Usuario ejecutada correctamente',  200, [], er, res);
        }
        else{ 
            var buscarUsuario = await Usuario.findOne({
                where:{
                    id: id
                }
            });
            if (!buscarUsuario) {
                const er = {
                    msj: 'el id del usuario no existe',
                    parametro: 'id'
                }
                MSJ('Peticion buscar Usuario ejecutada correctamente',  200, [], er, res);
            }
            else{
                buscarUsuario.contrasena= contrasena;
                buscarUsuario.login= login;
                buscarUsuario.correo= correo;
                buscarUsuario.ClienteId= ClienteId;
                await buscarUsuario.save()
                .then((data)=>{
                    console.log(data);
                    MSJ('Peticion Editar Usuario ejecutada correctamente',  200, data, [], res);
                })
                .catch((err) => {
                    var er='';
                    err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                    });
                    MSJ('Peticion Editar Usuario ejecutada correctamente',  200, [], {msj: er}, res);
                })
            }
        }
    }
}

exports.Eliminar = async (req, res) =>{const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Eliminar Usuario ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        console.log(id);
        if(!id){
            const er = {
                msj: 'el id del tipo no existe',
                parametro: 'id'
            }
            MSJ('Peticion Eliminar Usuario ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Usuario.destroy({where: {id: id}})
            .then((data)=>{
                console.log(data);
                MSJ('Peticion Eliminar Usuario ejecutada correctamente',  200, data, [], res);
            })
            .catch((err) => {
                console.log(err);
                res.json("Error al Eliminar el registro")
            })
        }
    }
}