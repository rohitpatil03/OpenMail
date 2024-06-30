// Create an SMTP server instance
const { SMTPServer } = require('smtp-server');
const simpleParser = require('mailparser').simpleParser;
var mongoose = require('mongoose');
require('dotenv').config()


const PORT = process.env.PORT

const CONNECTION_URL = process.env.MONGODB_URL

mongoose.connect(CONNECTION_URL).then((result) => {
  console.log("connected");
})
  .catch((err) => console.log(err));



const Email = require("./models/emailSchema");


const server = new SMTPServer({
  onData(stream, session, callback) {
    // Read the message data from the stream
    let data = '';
    stream.on('data', (chunk) => {
      data += chunk;
    });

    // Handle the message data
    stream.on('end', async () => {
      try {
        // Parse the email data
        const parsedEmail = await simpleParser(data);

        // Access different parts of the email
        // const emailData = {"from":parsedEmail.from.text, "to":parsedEmail.to.text, "subject":parsedEmail.subject, "content":parsedEmail.text}
        
        
        // Process the email data here (e.g., save to database, send notifications, etc.)
        const newEmail= new Email({from:parsedEmail.from.text, to:parsedEmail.to.text, subject:parsedEmail.subject, content:parsedEmail.text, important:parsedEmail.html.split(",")[1], starred:parsedEmail.html.split(",")[0], viewed:parsedEmail.html.split(",")[2]});
        newEmail.save()
            .then((result)=>{
              callback();
          })
          .catch((err) =>{
            callback(err);
            
          });

        
      } catch (error) {
        console.error('Error parsing email data:', error);
        // Handle the error appropriately
      }
    });

  },
  disabledCommands: ['AUTH'],
});

// Start the SMTP server
server.listen(PORT, () => {
  console.log(`SMTP server started on port ${PORT}`);
});