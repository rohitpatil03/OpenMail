const Email = require('../models/emailsDB');

const handleListCommand = async() =>{
  const messages = await Email.find()
  if (messages.length > 0) {
    const modifiedMessages = messages.map((msg) => {
      const modifiedMsg = {
        ...msg.toObject(),
        _id: msg._id.toString()
      };
      return modifiedMsg;
    });
  
    const msg = JSON.stringify(modifiedMessages);
    return msg;
  } else {
    return '-ERR Message not found\r\n';
  }
  
}


module.exports = handleListCommand;