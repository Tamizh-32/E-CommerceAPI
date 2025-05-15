const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    const userMsg = document.createElement('li');
    userMsg.textContent = `User: ${input.value}`;
    messages.appendChild(userMsg);

    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat reply', function (msg) {
  const botMsg = document.createElement('li');
  botMsg.textContent = `Bot: ${msg}`;
  messages.appendChild(botMsg);
});
