
exports.Inicio = (req, res) => {
    const sigmer={
        api: 'Interfaz de programacion del sistema SIGMER',
        sigmer: 'Sistema de gestion de menus para restaurantes',
        desarrollador: 'Edgardo Guzman',
        modulos:[
            {nombre: 'tipos', ruta: '/api/tipos'},
            {nombre: 'productos', ruta: '/api/productos'},
            {nombre: 'usuarios', ruta: '/api/usuarios'},
        ]
    }
    res.json(sigmer);
};


exports.Tipos = (req, res) => {

    res.send('Esta es la ruta de tipos');
};

exports.Productos = (req, res) => {

    res.send('Esta es la ruta de productos');
};

exports.Usuarios = (req, res) => {

    res.send('Esta es la ruta de usuarios');
};