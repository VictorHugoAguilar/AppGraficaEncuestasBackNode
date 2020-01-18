"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Server_1 = __importDefault(require("../class/Server"));
const socket_1 = require("../sockets/socket");
const grafica_1 = require("../class/grafica");
const router = express_1.Router();
const grafica = new grafica_1.GraficaData();
router.get('/grafica', (req, res) => {
    // Funcion callback que se ejecuta para devolver una vez se ha hecho la peticion get
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', (req, res) => {
    // Recibimos los parametros pasado por el cuerpo
    const opcion = Number(req.body.opcion);
    const unidades = Number(req.body.valor);
    grafica.incrementarValor(opcion, unidades);
    const server = Server_1.default.instance;
    // para emitir a un todos los usuario tenemos que usar el metodo 
    // emit (nombre del servicio, y el payload con el contenido )
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    // Funcion callback que se ejecuta para devolver una vez se ha hecho la peticion get
    res.json(grafica.getDataGrafica());
});
router.post('/mensajes/:id', (req, res) => {
    // Recibimos los parametros pasado por el cuerpo
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    // Instanciamos el servidor como es singleton es la única instancia
    const server = Server_1.default.instance;
    // para emitir a un solo usuario tenemos que usar el metodo in( 'parametro id' ) 
    // y luego emit (nombre del servicio, y el payload con el contenido )
    server.io.in(id).emit('mensaje-privado', payload);
    // Funcion callback que se ejecuta para devolver una vez se ha hecho la peticion get
    res.json({
        Ok: true,
        Message: 'Todo OK...',
        Service: 'POST',
        cuerpo,
        de,
        id
    });
});
// Servicios para obtener todos los IDS de los usuarios
router.get('/usuarios', (req, res) => {
    // obtenemos una instancia del servidor
    const server = Server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            clientes: clientes
        });
    });
});
// Obtener usuarios y sus nombre
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
// Exportamos la constante para poder utilizarla importandola cuando se necesite
exports.default = router;
