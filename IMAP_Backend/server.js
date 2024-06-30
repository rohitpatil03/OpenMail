const net = require('net');
var mongoose = require('mongoose');

//   This is to use env variables
require('dotenv').config();

//    Connecting to the database
const CONNECTION_URL = process.env.MONGODB_URL

mongoose.connect(CONNECTION_URL).then((result) => {
  console.log("connected");
})
  .catch((err) => console.log(err));


//   Import for Database Schema
const Email = require('./models/emailsDB');


//  Import for handling different commands
const handleListCommand = require('./commands/LIST');
const handleUserCommand = require('./commands/USER');
const handlePassCommand = require('./commands/PASS');
const handleFetchCommand = require('./commands/FETCH');
const handleDeleteCommand = require('./commands/DELETE');
const handleStoreCommand = require('./commands/STORE')

// Handle POP3 commands
function handleCommand(command, params) {
  switch (command) {
    case 'USER':
      return handleUserCommand(params);
    case 'PASS':
      return handlePassCommand(params);
    case 'LIST':
      return handleListCommand();
    case 'FETCH':
      return handleFetchCommand(params);
    case 'DELETE':
      return handleDeleteCommand(params);
    case 'STORE':
      return handleStoreCommand(params);
    case 'QUIT':
      return '+OK Bye!\r\n';
    default:
      return '-ERR Unknown command\r\n';
  }
}

// Create a POP3 server
const server = net.createServer((socket) => {
  console.log('Client connected.');

  // Event: Data received from client
  socket.on('data', async(data) => {
    var command = '';
    var params = '';
    var response = '';
    if (data.toString().trim().split(' ')) {
      [command, ...params] = data.toString().trim().split(' ');
      response = await handleCommand(command.toUpperCase(), params);
    } else {
      command = data.toString();
      response = await handleCommand(command.toUpperCase(), '');
    }
    socket.write(response);
  });

  // Event: Client disconnected
  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

// Start the POP3 server
const port = process.env.IMAP_PORT;
server.listen(port, () => {
  console.log(`POP3 server started on port ${port}`);
});
