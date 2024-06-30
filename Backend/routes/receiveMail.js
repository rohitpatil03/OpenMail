const net = require('net');
var express = require("express");
const isAuthenticated = require('../middlewares/authMiddleware');
var router = express.Router();


const host = process.env.IMAP_HOST
const port = process.env.IMAP_PORT

const connectPOP = (host, port) => {
  const client = net.createConnection({ host, port }, () => {
    console.log('Connected to IMAP server.');
})
return client
}

// router.get("/delete", (req, res)=>{
//   res.send(`
//   <form method="POST" action="/receive/delete">
//       <input type="text" placeholder="username" name="id">
      
//       <input type="submit">Submit</input>
//   </form>
//   `)
// })


// router.get('/all', isAuthenticated, (req, res)=>{
//   client = connectPOP(host, port)

//   const command = 'LIST';
//   client.write(command);
//   client.on('data', (data) => {
//     const jsonString = data.toString();
//     const jsonObject = JSON.parse(jsonString);
//     client.end();
//     res.send(jsonObject);
//   });
  
// })




router.post('/delete', isAuthenticated, (req, res)=>{
  client = connectPOP(host, port)
  const id = req.body.id

  const command = `DELETE ${id}`;
  client.write(command);
  client.on('data', (data) => {
    const jsonString = data.toString();
    if (jsonString == 'true'){
      client.end();
      res.send(true)
    }
    else{
      client.end();
      res.send(false)
    }
  });
  
})



router.get('/mail', isAuthenticated, (req, res)=>{
    client = connectPOP(host, port)

    const user = req.user.username
    const command = `FETCH ${user}`;
    client.write(command);

    
    client.on('data', (data) => {
      const jsonString = data.toString();
      try{
        const jsonObject = JSON.parse(jsonString);
        client.end();
        res.send(jsonObject);
      }
      catch(e){
        res.send([])
      }
      
      
    });
    
})


router.post('/edit', isAuthenticated, (req, res)=>{
  client = connectPOP(host, port)
  const id = req.body.id
  const update = req.body.update
  const setValue = req.body.value

  console.log(id, update, setValue)

  const command = `STORE ${id} ${update} ${setValue}`;
  client.write(command);
  client.on('data', (data) => {
    const jsonString = data.toString();
    if (jsonString == 'true'){
      client.end();
      res.send(true)
    }
    else{
      client.end();
      res.send(false)
    }
  });
  
})



module.exports = router;