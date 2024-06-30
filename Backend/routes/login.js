
var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken')
const EmailRegistration = require("./../models/emailRegistration");
const isAuthenticated = require('../middlewares/authMiddleware');
const crypto = require("crypto")

let algorithm = "sha256"



router.get("/get-login", (req, res)=>{
    res.send(`
    <form method="POST" action="/auth/login">
        <input type="text" placeholder="username" name="username">
        <input type="text" placeholder="password" name="password">
        <input type="submit">Submit</input>
    </form>
    `)
})


router.get("/get-register", (req, res)=>{
    res.send(`
    <form method="POST" action="/auth/register">
    <input type="text" placeholder="First Name" name="firstName" required>
    <input type="text" placeholder="Last Name" name="lastName" required>
    <input type="email" placeholder="Email" name="email" required>
    <input type="password" placeholder="Password" name="password" required>
    <input type="password" placeholder="Password" name="confirmPassword" required>
    <input type="submit" value="Submit">
</form>

    `)
})



router.post('/register', async(req, res) => {
    // Perform authentication logic, e.g., validate credentials
    const { password, confirmPassword, firstName, lastName, email } = req.body;
    

    if (password == confirmPassword){
        console.log(email)
        const digest = crypto.createHash(algorithm).update(password).digest('hex')
        const newuser= new EmailRegistration({
            firstName: firstName,
            lastName:lastName,
            email: email,
            password: digest,
            
          });
        
          result = await newuser.save()
          res.send(200)
    }
    else{
        res.status(401).send("Both password are not same")
    }
    
    
});

router.get('/user', isAuthenticated, (req, res)=>{
    const token = req.cookies.token;
    const resObject = {}
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
          console.error('JWT verification failed:', err.message);
          res.status(401);
        } else {
          console.log('Decoded JWT payload:', decoded);
          resObject.username = decoded.username;
        }
      });
    res.send(resObject)
})


router.post('/login', async(req, res) => {
    // Perform authentication logic, e.g., validate credentials
    const { username, password } = req.body;
    

    const digest = crypto.createHash(algorithm).update(password).digest('hex')
    const result = await EmailRegistration.findOne({"email":username});
    try{
        if (username==result.email && digest==result.password){
            //  Added jwt token in login
            //  Not added in register
            //  Also not added in middleware
            const payload = {username: username}
            const token = jwt.sign(payload, process.env.JWT_ACCESS_KEY)
            res.cookie('token', token, { httpOnly: true });
            res.send("Login successful").status(200)
        }
    
        else{
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch(e){
        console.log(e);
        res.send("Not registered yet").redirect("/auth/get-register");
    }
    
});


router.get('/logout', isAuthenticated, (req, res) => {
    // Clear the token cookie
    
    res.clearCookie("token")
    res.send("logout successfully")
    res.status(200)
});




module.exports=router;