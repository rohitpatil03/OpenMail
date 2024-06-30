const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];


function handlePassCommand(params) {
    const [password] = params;
  
    if (selectedUser && selectedUser.password === password) {
      authenticated = true;
      return '+OK Authenticated\r\n';
    } else {
      return '-ERR Authentication failed\r\n';
    }
  }

module.exports = handlePassCommand;