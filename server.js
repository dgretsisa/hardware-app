const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

/** App Middlewares */
app.use(cors());

/** Routes */
app.get('/', (req, res) => res.send('Hello World'));

/** Create Server */
const server = http.Server(app);
const socket = socketio(server);

/** Socket Connection */
socket.on('connection', client => {
    console.log(`[ ${client.id} ]: connected to the server.`);

    /** Disconnect */
    client.on('disconnect', () => console.log(`[ ${client.id} ]: disconnected from the server.`));

    client.emit('welcome', 'Welcome Message');
});

/** Listen Server */
const port = process.env.PORT || 8000;
const url = process.env.APP_URL;

server.listen(port, () => console.log(`Server running at ${url}:${port}`));