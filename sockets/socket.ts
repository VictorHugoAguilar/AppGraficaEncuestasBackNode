import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

// exportar usuarios conectados  
export const usuariosConectados = new UsuariosLista();

// logica para desconectar un cliente
export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado... ', cliente.id);
        // eliminamos el usuario que se ha desconectado
        usuariosConectados
            .deleteUsuario(cliente.id);

        // modificar el estado de la lista de usuario
        io.emit('usuarios-activos', usuariosConectados
            .getLista())

    })
}

// conectar cliente
export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {

    // creamos una instancia de un usuario
    const usuario = new Usuario(cliente.id);
    usuariosConectados
        .agregar(usuario);



}

// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log("Mensaje recibido", payload);

        io.emit('nuevo-mensaje', payload);

    });
}

// escuchar login usuario
export const usuarioLogin = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: any) => {

        // console.log('Usuario configurando', payload.nombre);

        // Actualizar datos de usuario
        usuariosConectados
            .actualizarUsuario(cliente.id, payload.nombre);

        // modificar el estado de la lista de usuario
        io.emit('usuarios-activos', usuariosConectados.getLista())

        callback({
            Ok: true,
            message: `Usuario ${payload.nombre}, configurado.`
        });

    });
}


// Creamos un metodo para obtener usuarios
export const getUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        /*
            modificar el estado de la lista de usuario
            utilizando io.to( cliente.id ) es para solo
            emitirlo a la persona que acaba de entrar al chat
        */
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista())

    });
}
