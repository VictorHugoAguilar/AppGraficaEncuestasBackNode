import { Usuario } from './usuario';
export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() { };

    // Añadir usuario a la lista
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario
    }

    // Actualizar un usuario de la lista
    public actualizarUsuario(id: string, nombre: string) {

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
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }

    // Obtener un usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }


    // Obtener usuarios en una sala en particular
    public getUsuarioSala(sala: string) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }

    // Borrar un usario de la lista
    public deleteUsuario(id: string) {

        const tempUsaurio = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id;
        });

        return tempUsaurio;
    }
}