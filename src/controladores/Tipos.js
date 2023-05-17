const Tipo = require('../modelos/Tipos');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');
const { Op } = require('sequelize');
const fs = require('fs');
const path =require('path');
var errores = [];
var data = [];
var error = {
    msg: '',
    parametros: ''
};
exports.Inicio = (req, res)=>{
    const moduloTipos ={
        modulo: '/tipos/',
        descripcion: 'Contiene la informacion de los tipos de productos',
        rutas:[
            {
                ruta: '/api/tipos/listar',
                descripcion: 'Lista los tipos de productos',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/tipos/guardar',
                descripcion: 'Guarda los tipos de productos',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/tipos/editar',
                descripcion: 'Modifica los tipos de productos',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/tipos/eliminar',
                descripcion: 'Eliminar los tipos de productos',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    } 
    MSJ('Peticion Tipo ejecutada correctamente',  200, moduloTipos, [], res);
}

exports.Listar = async (req, res) =>{
    const listaTipos = await Tipo.findAll();
    console.log(listaTipos);
    MSJ('Peticion ejecutada correctamente',  200, listaTipos, [], res);
}

exports.BuscarId= async (req, res) =>{

    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        const listaTipos = await Tipo.findOne(
            {   
                attributes: [['nombre', 'Nombre Tipo'], 'imagen'],
                where:{
                    id:id
                }
            }
        );
        if(!listaTipos){
            const er = {
                msj: 'el id no existe',
                parametro: 'id'
            }
            MSJ('Peticion ejecutada correctamente',  200, [], er, res);
        }
        else{
            MSJ('Peticion ejecutada correctamente',  200, listaTipos, [], res);
        }
    }
}

exports.BuscarNombre = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { nombre } = req.query;
        const listaTipos = await Tipo.findAll(
            {   
                attributes: [['nombre', 'Nombre Tipo'], 'imagen', 'activo'],
                where:{
                    [Op.or]: {
                        nombre:{
                            [Op.like]: nombre
                        },
                        activo: true,
                    }
                }
            }
        );
        if(!listaTipos){
            const er = {
                msj: 'el nombre no existe',
                parametro: 'nombre'
            }
            MSJ('Peticion ejecutada correctamente',  200, [], er, res);
        }
        else{
            MSJ('Peticion ejecutada correctamente',  200, listaTipos, [], res);
        }
    }
}

exports.Guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { nombre } = req.body;
        if(!nombre){
            const er = {
                msj: 'Debe escribir el nombre del tipo',
                parametro: 'nombre'
            }
            MSJ('Peticion ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Tipo.create({
                nombre: nombre
            }).then((data)=>{
                console.log(data);
                MSJ('Peticion ejecutada correctamente',  200, data, [], res);
            }).catch((err) =>{
                var er='';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                });
                MSJ('Peticion ejecutada correctamente',  200, [], {msj: er}, res);
            });
        }
    }
}

exports.Editar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        const { nombre, activo } = req.body;
        console.log(id);
        console.log(nombre);
        console.log(activo);
        if(!id){
            const er = {
                msj: 'Debe escribir el id del tipo',
                parametro: 'id'
            }
            MSJ('Peticion ejecutada correctamente',  200, [], er, res);
        }
        else{ 
            if(!nombre){
                const er = {
                    msj: 'Debe escribir el nombre del tipo',
                    parametro: 'nombre'
                }
                MSJ('Peticion ejecutada correctamente',  200, [], er, res);         
            }
            else{
                var buscarTipo = await Tipo.findOne({
                    where:{
                        id: id
                    }
                });
                if (!buscarTipo) {
                    const er = {
                        msj: 'el id del tipo no existe',
                        parametro: 'id'
                    }
                    MSJ('Peticion ejecutada correctamente',  200, [], er, res);
                }
                else{
                    buscarTipo.nombre=nombre;
                    buscarTipo.activo= activo;
                    await buscarTipo.save()
                    .then((data)=>{
                        MSJ('Peticion ejecutada correctamente',  200, data, [], res);
                    })
                    .catch((err) => {
                        var er='';
                        err.errors.forEach(element => {
                        console.log(element.message);
                        er+=element.message + '. ';
                    });
                        MSJ('Peticion ejecutada correctamente',  200, [], {msj: er}, res);
                    })
                }
            }
        }
    }
}

exports.RecibirImagen = async(req,res)=>{
    const { filename } = req.file;
    const { id } =req.body;
    //console.log(req);
    console.log(filename);
    try{
        errores=[];
        data=[];
        var buscarTipo = await Tipo.findOne({where: { id }});
        if(!buscarTipo){
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/tipos/' + filename));
            if(!buscarImagen){
                console.log('La imagen no existe');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/tipos' + filename));//unlinksync elimina la imagen
                console.log('Imagen eliminada');
            }
            error.msg='El id del tipo no existe, se elimino la imagen enviada';
            error.parametro='id';
            errores.push(error);
            MSJ("Peticion ejecutada correctamente", 200, [], errores, res);
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/tipos/' + buscarTipo.imagen));
            if(!buscarImagen){
                console.log('No encontró la imagen');
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../public/img/tipos/' +  buscarTipo.imagen));
                console.log('Imagen eliminada');
            }
            buscarTipo.imagen=filename;
            await buscarTipo.save()
            .then((data)=>{
                MSJ('Peticion ejecutada correctamente', 200, data, errores, res);
            })
            .catch((error)=>{
                errores.push(error);
                MSJ('Peticion ejecutada correctamente', 200, [], errores,res);
            });
        } 
    } catch(error){
        errores.push(error);
        console.log(error);
        MSJ('Error a ejecutar la peticion', 500, [], errores, res);
    }
}

exports.Eliminar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        console.log(id);
        if(!id){
            const er = {
                msj: 'el id del tipo no existe',
                parametro: 'id'
            }
            MSJ('Peticion ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Tipo.destroy({where: {id: id}})
                    .then((data)=>{
                        console.log(data);
                        MSJ('Peticion ejecutada correctamente',  200, data, [], res);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json("Error al Eliminar el registro")
                    })
        }
    }
}