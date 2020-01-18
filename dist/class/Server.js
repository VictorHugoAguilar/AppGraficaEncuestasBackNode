"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../global/enviroment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
//importamos las funciones de los sockets
const socket = __importStar(require("../sockets/socket"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = enviroment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    // Creamos el método para obtener la instancia, que será la única
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
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
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
