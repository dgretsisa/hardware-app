import React from "react";
import socketio from "socket.io-client";

const server = 'http://localhost:8000';
export const socket = socketio.connect(server, {transports: ['websocket']});
export const SocketContext = React.createContext();