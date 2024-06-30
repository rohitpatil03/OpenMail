const Email = require('../models/emailsDB');

const handleDeleteCommand = async(params) => {
  const msgId = params[0];
  try{
      const message = await Email.deleteOne({
          _id:msgId
      })
        if (message.deletedCount>0) {
          return (`true`);
        } else {
          return (`false`);
        }
      }
    catch(e){
      console.log(e)
    }
}


module.exports = handleDeleteCommand;