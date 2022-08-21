import { Chats } from '../db/dbFBS.js';

let chatsArr = [];

//WEB SOCKETS EVENTS
export const socketsEvents = (io) => {
  io.on('connection', async (socket) => {
    console.log(socket.id);

    try {
      if (chatsArr.length <= 0) {
        const oldMessData = await Chats.get();

        oldMessData.forEach((chat) => {
          chatsArr.push({ id: chat.id, ...chat.data() });
        });

        io.emit('server:messages', chatsArr);
      } else {
        io.emit('server:messages', chatsArr);
      }

      // if (chatsArr.length > 0) {
      //   const oldDataNormalized = normalizedData(chatsArr);
      //   const porcentaje = compressionPercentage(oldDataNormalized, chatsArr);
      //   const resp = { oldDataNormalized, porcentaje};

      // }
    } catch (err) {
      console.log(err.message);
    }

    socket.on('client:newMessage', async (mess) => {
      console.log(chatsArr);
      try {
        const newMess = await Chats.add(mess);
        chatsArr.push({ id: newMess.id, ...mess });

        // const oldDataNormalized = normalizedData(chatsArr);
        // const porcentaje = compressionPercentage(oldDataNormalized, chatsArr);
        // const resp = { oldDataNormalized, porcentaje };

        io.emit('server:messages', chatsArr);
      } catch (err) {
        const error = new Error(err.message);
        console.log(error);
      }
    });
  });
};
