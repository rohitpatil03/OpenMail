var express = require("express");
var router = express.Router();
const isAuthenticated = require('../middlewares/authMiddleware');
const nodemailer = require('nodemailer');

// Create a SMTP transport
const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 2500,
    tls: {
        rejectUnauthorized: false
      },
      
});



router.get("/mail", isAuthenticated, (req, res) => {


    res.send(`
    <form method="POST" action="/send/mail">
    <input type="email" placeholder="To" name="to" required>
    <input type="email" placeholder="From" name="from" required>
    <input type="text" placeholder="subject" name="subject" required>
    <input type="radio"  name="starred" value="true" required>
    <input type="radio" name="starred" value="false" required>
    <input type="radio" name="important" value="true" required>
    <input type="radio" name="important" value="false" required>
    <textarea  type="text" placeholder="Content" name="content" required></textarea>
    
    <input type="submit" value="Submit">
</form>

    `)
    

})






router.post("/mail", isAuthenticated, (req, res) => {


    
    const data = req.body;
    
    
    // Define the email options
    // In html first parameter is """starred""" and second is """important"""
    const mailOptions = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.content,
        html:`${data.starred},${data.important},false`
      };
      

    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.send(`Error : ${error}`).status(500)
        } else {
            console.log('Email sent:', info.response);
            res.send("Email Send successfully")
        }
    });

})


module.exports = router;