'use-strict';

const socket = io('/');

//GLOBAL VARIABLES
const chatForm = document.querySelector('#chatForm');
const messages = document.querySelector('#userMessage');
const btnChatSubmit = document.querySelector('#submitBtnMessage');
const chatContainer = document.querySelector('#chatContainer');
const userEmail = document.getElementById('userEmail');
const userName = document.getElementById('userName');
const allMessage = document.getElementById('allMessagesContainer');

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
  console.log(mess);
  if (mess) {
    chatContainer.innerHTML = '';
    allMessage.classList.remove('hideBox');

    mess.forEach((item) => {
      const newMess = `<p><span class="fw-bold text-primary">${item.author.email}</span> <span class="fw-normal brown">${item.date}: </span><span class="fst-italic text-success">${item.message}</span></p>`;
      chatContainer.innerHTML += newMess;
    });
  }

  // const denormalizedData = normalizr.denormalize(mess.oldDataNormalized.result, schemaMensajes, mess.oldDataNormalized.entities);

  // if (denormalizedData) {
  //   const chats = denormalizedData.mensajes;

  //   const templateMess = `
  //       {{#each chats}}
  //           <p><span class="fw-bold text-primary">{{ author.email }}</span> <span class="fw-normal brown">{{ date }}: </span><span class="fst-italic text-success">{{ message }}</span></p>
  //       {{/each}}
  //   `;

  //   const template = Handlebars.compile(templateMess);
  //   const newMessages = template({ chats });

  //   document.getElementById('compressionNormalized').textContent = mess.porcentaje;

  //   chatContainer.innerHTML = newMessages;
});
