"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./class/Server"));
const enviroment_1 = require("./global/enviroment");
const router_1 = __importDefault(require("./routes/router"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server = Server_1.default.instance;
// Body Parser Configuracion 
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Configuracion de middleware CORS para definir los dominios que pueden recibir o enviar REST
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de servicios
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en puerto  ${enviroment_1.SERVER_PORT}  ::: ${new Date().toUTCString()} `);
});
