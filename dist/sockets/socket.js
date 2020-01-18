"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("../class/usuarios-lista");
const usuario_1 = require("../class/usuario");
// exportar usuarios conectados  
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
// logica para desconectar un cliente
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado... ', cliente.id);
        // eliminamos el usuario que se ha desconectado
        exports.usuariosConectados
            .deleteUsuario(cliente.id);
        // modificar el estado de la lista de usuario
        io.emit('usuarios-activos', exports.usuariosConectados
            .getLista());
    });
};
// conectar cliente
exports.conectarCliente = (cliente, io) => {
    // creamos una instancia de un usuario
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados
        .agregar(usuario);
};
// escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log("Mensaje recibido", payload);
        io.emit('nuevo-mensaje', payload);
    });
};
// escuchar login usuario
exports.usuarioLogin = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        // console.log('Usuario configurando', payload.nombre);
        // Actualizar datos de usuario
        exports.usuariosConectados
            .actualizarUsuario(cliente.id, payload.nombre);
        // modificar el estado de la lista de usuario
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            Ok: true,
            message: `Usuario ${payload.nombre}, configurado.`
        });
    });
};
// Creamos un metodo para obtener usuarios
exports.getUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        /*
            modificar el estado de la lista de usuario
            utilizando io.to( cliente.id ) es para solo
            emitirlo a la persona que acaba de entrar al chat
        */
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
