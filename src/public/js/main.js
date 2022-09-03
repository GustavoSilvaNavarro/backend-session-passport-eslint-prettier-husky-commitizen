'use-strict';

const socket = io('/');

//SCHEMAS
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const mensajeSchema = new normalizr.schema.Entity('mensaje', { author: authorSchema }, { idAttribute: 'id' });
const schemaMensajes = new normalizr.schema.Entity('mensajes', { mensajes: [mensajeSchema] }, { idAttribute: 'id' });

//GLOBAL VARIABLES
const chatForm = document.querySelector('#chatForm');
const messages = document.querySelector('#userMessage');
const btnChatSubmit = document.querySelector('#submitBtnMessage');
const chatContainer = document.querySelector('#chatContainer');
const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const allMessage = document.getElementById('allMessagesContainer');
const noChatsTitle = document.getElementById('noChatsAvailableTitle');
const displayPercentage = document.getElementById('compressionNormalized');

//SUBMIT MESSAGE
btnChatSubmit.onclick = (e) => {
  e.preventDefault();

  //Get object
  const date = new Date(Date.now()).toLocaleString().replace(',', '');
  const fecha = `[${date}]`;

  const mensaje = {
    author: {
      email: userEmail.textContent,
      nombre: userName.textContent,
    },
    date: fecha,
    message: messages.value,
  };

  socket.emit('client:newMessage', mensaje);
  chatForm.reset();
};

socket.on('server:messages', (mess) => {
  const denormalizedData = normalizr.denormalize(
    mess.oldMessToNormalize.result,
    schemaMensajes,
    mess.oldMessToNormalize.entities
  );

  if (denormalizedData.mensajes.length > 0) {
    chatContainer.innerHTML = '';
    allMessage.classList.remove('hideBox');
    noChatsTitle.classList.add('disapearComponent');

    //Write the percentage
    const percentage = mess.percentage.toFixed(2);
    displayPercentage.textContent = Number(percentage);

    denormalizedData.mensajes.forEach((item) => {
      const newMess = `<p><span class="fw-bold text-primary">${item.author.email}</span> <span class="fw-normal brown">${item.date}: </span><span class="fst-italic text-success">${item.message}</span></p>`;
      chatContainer.innerHTML += newMess;
    });
  }
});
