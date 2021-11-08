const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express();

/** Database Connection */
const connectDB = require('./server/utility/database.connection');
connectDB();

/** App Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/** Routes */
app.use('/api/users', require('./server/route/user.route'));
app.use('/auth', require('./server/route/auth.route'));


/** Error Handler */
const errorHandler = require('./server/utility/error.handler');
app.use(errorHandler);

/** Create Server */
const server = http.Server(app);
const socket = socketio(server);

/** Socket Connection */
socket.on('connection', client => {
    console.log(`[ ${client.id} ]: connected to the server.`);

    /** Disconnect */
    client.on('disconnect', () => console.log(`[ ${client.id} ]: disconnected from the server.`));
});

/** Globalize Socket */
app.set('socket', socket);

/** Listen Server */
const port = process.env.PORT || 8000;
const url = process.env.APP_URL;

server.listen(port, () => console.log(`Server running at ${url}:${port}`));