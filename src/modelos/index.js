const Tipo = require('./Tipos');
const Usuario = require('./Usuarios');
const Cliente = require('./Cliente');
const Producto = require('./productos')

exports.CrearModelos = async () =>{
    
    Cliente.hasMany(Usuario);
    Usuario.belongsTo(Cliente);

    Tipo.hasMany(Producto);
    Producto.belongsTo(Tipo);

    await Tipo.sync().then(()=>{
        console.log('Modelo tipo Creado correctamente');
    })
    .catch((err) =>{
        console.log('Error al crear el modelo tipo');
    })
    
    await Producto.sync().then(()=>{
        console.log('Modelo producto creado correctamente');
    })
    .catch((err) =>{
        console.log('Error al crear el modelo Producto');
    })

    await Cliente.sync().then(()=>{
        console.log('Modelo cliente Creado correctamente');
    })
    .catch((err) =>{
        console.log('Error al crear el modelo Cliente');
    })

    await Usuario.sync().then(()=>{
        console.log('Modelo Usuario Creado correctamente');
    })
    .catch((err) =>{
        console.log('Error al crear el modelo usuario');
    })
};