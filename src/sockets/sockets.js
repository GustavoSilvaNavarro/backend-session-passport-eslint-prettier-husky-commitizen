import { Chats } from '../db/dbFBS.js';
import {
  normalizedData,
  compressionPercentage,
} from '../utils/normalization.js';

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

        //NORMALIZATION
        const oldMessToNormalize = normalizedData(chatsArr);
        const percentage = compressionPercentage(oldMessToNormalize, chatsArr);

        const response = { oldMessToNormalize, percentage };

        io.emit('server:messages', response);
      } else {
        //NORMALIZATION
        const oldMessToNormalize = normalizedData(chatsArr);
        const percentage = compressionPercentage(oldMessToNormalize, chatsArr);

        const response = { oldMessToNormalize, percentage };

        io.emit('server:messages', response);
      }
    } catch (err) {
      console.log(err.message);
    }

    socket.on('client:newMessage', async (mess) => {
      try {
        const newMess = await Chats.add(mess);
        chatsArr.push({ id: newMess.id, ...mess });

        //NORMALIZATION
        const oldMessToNormalize = normalizedData(chatsArr);
        const percentage = compressionPercentage(oldMessToNormalize, chatsArr);
        const result = { oldMessToNormalize, percentage };

        io.emit('server:messages', result);
      } catch (err) {
        const error = new Error(err.message);
        console.log(error);
      }
    });
  });
};
