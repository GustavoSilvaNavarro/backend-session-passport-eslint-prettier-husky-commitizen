// import { Chats } from '../db/dbFBS.js';

//WEB SOCKETS EVENTS
export const socketsEvents = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id);
  });
};
