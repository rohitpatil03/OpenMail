const Email = require('../models/emailsDB');

const handleStoreCommand = async(params) => {
  const msgId = params[0];
  const value = params[1];
  const setValue = params[2];

  if (value=='starred'){
    const message = await Email.findByIdAndUpdate(msgId, {starred:setValue}, {new:true})
    if(message){
        return(`true`)
    }
    else{
        return(`false`)
    }
  }
  else if(value=='important'){
    const message = await Email.findByIdAndUpdate(msgId, {important:setValue}, {new:true})
    if(message){
        return(`true`)
    }
    else{
        return(`false`)
    }
  }
  else if(value=='viewed'){
    const message = await Email.findByIdAndUpdate(msgId, {viewed:setValue}, {new:true})
    if(message){
        return(`true`)
    }
    else{
        return(`false`)
    }
  }
  
      
    
}


module.exports = handleStoreCommand;