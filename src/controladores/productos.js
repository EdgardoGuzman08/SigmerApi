const Producto = require('../modelos/productos');
const { validationResult } = require('express-validator');
const MSJ = require('../componentes/mensaje');

exports.Inicio = (req, res)=>{
    const moduloProducto ={
        modulo: 'producto',
        descripcion: 'Contiene la informacion de los productos',
        rutas:[
            {
                ruta: '/api/productos/listar',
                descripcion: 'Lista los productos',
                metodo: 'GET',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/productos/guardar',
                descripcion: 'Guarda los productos',
                metodo: 'POST',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/productos/editar',
                descripcion: 'Modifica los productos',
                metodo: 'PUT',
                parametros: 'ninguno'
            },
            {
                ruta: '/api/productos/eliminar',
                descripcion: 'Eliminar los productos',
                metodo: 'DELETE',
                parametros: 'ninguno'
            }
        ]
    } 
    MSJ('Peticion Producto ejecutada correctamente',  200, moduloProducto, [], res);
}

exports.Listar = async (req, res) =>{
    const listaProducto= await Producto.findAll();
    console.log(listaProducto);
    MSJ('Peticion Producto Listar ejecutada correctamente',  200, listaProducto, [], res);
}

exports.Guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Producto ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { nombre, direccion, precio, estado, categoria, TipoId } = req.body;
        if(!nombre || !precio || !TipoId){
            const er = {
                msj: 'Debe escribir los datos del producto correctamente',
                parametro: 'nombre, precio, TipoId'
            }
            MSJ('Peticion Guardar Producto ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Producto.create({
                nombre: nombre,
                precio: precio,
                TipoId: TipoId
            }).then((data)=>{
                console.log(data);
                MSJ('Peticion Guardar producto ejecutada correctamente',  200, data, [], res);
            }).catch((err) =>{
                var er='';
                err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                });
                MSJ('Peticion Guardar producto ejecutada correctamente',  200, [], {msj: er}, res);
            });
        }
    }
}

exports.Editar = async (req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Editar producto ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        const { nombre,  precio, TipoId} = req.body;
        if(!id || !nombre || !precio || !TipoId){
            const er = {
                msj: 'Debe escribir el id del producto',
                parametro: 'id'
            }
            MSJ('Peticion Editar Producto ejecutada correctamente',  200, [], er, res);
        }
        else{ 
            var buscarProducto = await Producto.findOne({
                where:{
                    id: id
                }
            });
            if (!buscarProducto) {
                const er = {
                    msj: 'el id del producto no existe',
                    parametro: 'id'
                }
                MSJ('Peticion buscar producto ejecutada correctamente',  200, [], er, res);
            }
            else{
                buscarProducto.nombre= nombre;
                buscarProducto.precio= precio;
                buscarProducto.TipoId= TipoId;
                await buscarProducto.save()
                .then((data)=>{
                    console.log(data);
                    MSJ('Peticion Editar producto ejecutada correctamente',  200, data, [], res);
                })
                .catch((err) => {
                    var er='';
                    err.errors.forEach(element => {
                    console.log(element.message);
                    er+=element.message + '. ';
                    });
                    MSJ('Peticion Editar producto ejecutada correctamente',  200, [], {msj: er}, res);
                })
            }
        }
    }
}

exports.Eliminar = async (req, res) =>{const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion);
        MSJ('Peticion Eliminar producto ejecutada correctamente',  200, [], validacion.errors, res);
    }
    else{
        const { id } = req.query;
        console.log(id);
        if(!id){
            const er = {
                msj: 'el id del producto no existe',
                parametro: 'id'
            }
            MSJ('Peticion Eliminar producto ejecutada correctamente',  200, [], er, res);
        }
        else{
            await Producto.destroy({where: {id: id}})
            .then((data)=>{
                console.log(data);
                MSJ('Peticion Eliminar producto ejecutada correctamente',  200, data, [], res);
            })
            .catch((err) => {
                console.log(err);
                res.json("Error al Eliminar el registro")
            })
        }
    }
}