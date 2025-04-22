const socket = io();

let currentRoom = null;

document.getElementById('joinBtn').onclick = () => {
  const username = document.getElementById('username').value;
  const room = document.getElementById('room').value;
  socket.emit('joinRoom', { username, room });
  currentRoom = room;

  document.getElementById('login').style.display = 'none';
  document.getElementById('chat').style.display = 'block';
};

document.getElementById('sendBtn').onclick = () => {
  const msg = document.getElementById('msgInput').value;
  socket.emit('chatMessage', { room: currentRoom, message: msg });
  document.getElementById('msgInput').value = '';
};

socket.on('message', (data) => {
  const div = document.createElement('div');
  div.innerText = `${data.user}: ${data.text}`;
  document.getElementById('messages').appendChild(div);
});

socket.on('privateMessage', (data) => {
  const div = document.createElement('div');
  div.innerText = `🔒 Private from ${data.from}: ${data.text}`;
  div.style.color = 'purple';
  document.getElementById('messages').appendChild(div);
});

socket.on('notification', (text) => {
  const div = document.createElement('div');
  div.innerText = `🔔 ${text}`;
  div.style.fontStyle = 'italic';
  document.getElementById('messages').appendChild(div);
});
