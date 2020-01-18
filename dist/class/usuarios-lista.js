"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    ;
    // Añadir usuario a la lista
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    // Actualizar un usuario de la lista
    actualizarUsuario(id, nombre) {
        for (let user of this.lista) {
            if (user.id === id) {
                user.nombre = nombre;
                break;
            }
        }
        console.log('===Actualizando ====');
        console.log(this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    // Obtener un usuario
    getUsuario(id) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }
    // Obtener usuarios en una sala en particular
    getUsuarioSala(sala) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }
    // Borrar un usario de la lista
    deleteUsuario(id) {
        const tempUsaurio = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id;
        });
        return tempUsaurio;
    }
}
exports.UsuariosLista = UsuariosLista;
