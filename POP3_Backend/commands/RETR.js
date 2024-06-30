const Email = require('../models/emailsDB');

const handleRetrCommand = async(params) => {
    const msgId = params[0];
    try{
        const message = await Email.find({
            $or: [
              { to: msgId },
              { from: msgId },
            ]
          });
          
          if (message.length > 0) {
            const modifiedMessages = message.map((msg) => {
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
    catch (error) {
        console.error('Error finding item:', error);
      }
    
    
        // const message = messages.find((msg) => msg.id === msgId && !msg.markedForDeletion);
        
    }
module.exports = handleRetrCommand;