const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];



function handleUserCommand(params) {
    const [username] = params;
    selectedUser = users.find((user) => user.username === username);
  
    if (selectedUser) {
      return '+OK User recognized\r\n';
    } else {
      return '-ERR Invalid username\r\n';
    }
  }


module.exports = handleUserCommand;