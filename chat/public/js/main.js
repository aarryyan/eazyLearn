const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
// get username and Room
// const {username} = Qs.parse(window.location.search);
const {room} = Qs.parse(window.location.search);
  // ignoreQueryPrefix: true,
// });

// console.log(username, room);
const socket = io();

// join chatroom

socket.emit('joinRoom', {username, room});

// get room and users
socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room);
  outputUsers(users);
});

//  message from server
socket.on('message', function(message){
  console.log(message);
  outputMessage(message);


  // scroll
chatMessages.scrollTop = chatMessages.scrollHeight;

// clear input

});

// message submit
chatForm.addEventListener('submit',(e) => {
  e.preventDefault();
//  get mst
  const msg = e.target.elements.msg.value;
// emit
  socket.emit('chatMessage', msg);

  //
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});


function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = "<p class='meta'>"+message.username+"<span>"+message.time+"</span></p><p class='text'>"+message.text+"</p>";
  document.querySelector('.chat-messages').appendChild(div);
}


function outputRoomName(room) {
  roomName.innerText = room;
}
// //
//
function outputUsers(users){
  userList.innerHTML = users.map(user => '<li>"'+user.username+'"</li>').join();
}