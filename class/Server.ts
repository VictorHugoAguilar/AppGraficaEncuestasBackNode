import express from 'express';
import { SERVER_PORT } from '../global/enviroment';

import socketIO from 'socket.io';
import http from 'http';

//importamos las funciones de los sockets
import * as socket from '../sockets/socket';

export default class Server {
    // Utilizando el patron Singleton
    // Creamos una propiedad instancia privada del tipo Server, que sera la que única en la app
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    // Creamos el método para obtener la instancia, que será la única
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    private escucharSockets() {
        console.log('Escuchando conexiones -- sockets');

        this.io.on('connection', cliente => {
            // console.log("Nuevo cliente conectado...");
            // console.log(cliente.id);

            // Conectar cliente
            socket.conectarCliente(cliente, this.io);

            // Usuario Login
            socket.usuarioLogin(cliente, this.io);

            // Obtener usuarios activos
            socket.getUsuarios(cliente, this.io);

            // Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar sockets
            socket.desconectar(cliente, this.io);

        });
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
} 