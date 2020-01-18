import Server from './class/Server';
import { SERVER_PORT } from './global/enviroment';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

// Body Parser Configuracion 
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Configuracion de middleware CORS para definir los dominios que pueden recibir o enviar REST
server.app.use(cors({ origin: true, credentials: true }))

// Rutas de servicios
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en puerto  ${SERVER_PORT}  ::: ${new Date().toUTCString()} `);
});