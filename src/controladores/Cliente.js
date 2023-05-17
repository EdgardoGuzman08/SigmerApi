const Cliente = require('../modelos/Cliente');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');

exports.Inicio = (req, res)=>{
    const moduloCliente ={
        modulo: 'cliente',
        descripcion: 'Contiene la informacion de los clientes',
        rutas:[
            {
                ruta: '/api/clientes/listar',
                descripcion: 'Lista los clientes',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/clientes/guardar',
                descripcion: 'Guarda los clientes',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/clientes/editar',
                descripcion: 'Modifica los clientes',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/clientes/eliminar',
                descripcion: 'Eliminar los clientes',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    } 
    MSJ('Peticion Cliente ejecutada correctamente',  200, moduloTipos, [], res);
}

exports.Listar = async (req, res) =>{
    const listaCliente = await Cliente.findAll();
    console.log(listaCliente);
    MSJ('Peticion Listar Cliente ejecutada correctamente',  200, listaCliente, [], res);
}

exports.Guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Guardar Cliente ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { nombre, apellido, telefono, direccion, imagen } = req.body;
        if(!nombre || !apellido ){
            const er = {
                msj: 'Debe escribir los datos del usuario correctamente',
                parametro: 'nombre, apellido'
            }
            MSJ('Peticion Guardar Cliente ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Cliente.create({
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                direccion: direccion,
            }).then((data)=>{
                console.log(data);
                MSJ('Peticion Guardar Cliente ejecutada correctamente',  200, data, [], res);
            }).catch((err) =>{
                var er='';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                });
                MSJ('Peticion Guardar Cliente ejecutada correctamente',  200, [], {msj: er}, res);
            });
        }
    }
}

exports.Editar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Editar Cliente ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        const { nombre, apellido, telefono, direccion, imagen } = req.body;
        if(!id || !nombre || !apellido){
            const er = {
                msj: 'Debe escribir el id del cliente',
                parametro: 'id'
            }
            MSJ('Peticion Editar Cliente ejecutada correctamente',  200, [], er, res);
        }
        else{ 
            var buscarCliente = await Cliente.findOne({
                where:{
                    id: id
                }
            });
            if (!buscarCliente) {
                const er = {
                    msj: 'el id del Cliente no existe',
                    parametro: 'id'
                }
                MSJ('Peticion buscar cliente ejecutada correctamente',  200, [], er, res);
            }
            else{
                buscarCliente.nombre=nombre;
                buscarCliente.apellido= apellido;
                buscarCliente.telefono= telefono;
                buscarCliente.direccion= direccion;
                buscarCliente.imagen= imagen;
                await buscarCliente.save()
                .then((data)=>{
                    console.log(data);
                    MSJ('Peticion Editar Cliente ejecutada correctamente',  200, data, [], res);
                })
                .catch((err) => {
                    var er='';
                        err.errors.forEach(element => {
                        console.log(element.message);
                        er+=element.message + '. ';
                    });
                        MSJ('Peticion Editar Cliente ejecutada correctamente',  200, [], {msj: er}, res);
                })
            }
        }
    }
}

exports.Eliminar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Eliminar Cliente ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        console.log(id);
        if(!id){
            const er = {
                msj: 'el id del cliente no existe',
                parametro: 'id'
            }
            MSJ('Peticion Eliminar Cliente ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Cliente.destroy({where: {id: id}})
                    .then((data)=>{
                        console.log(data);
                        MSJ('Peticion Eliminar Cliente ejecutada correctamente',  200, data, [], res);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json("Error al Eliminar el registro")
                    })
        }
    }
}