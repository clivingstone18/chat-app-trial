const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");
const httpServer = require("http").createServer();
const {addUser, removeUser, getUser, getUsersInRoom} = require("./users.js");


const io = require('socket.io')(port);

const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'https://roomchatter123.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))/* srv react to browser */

if (process.env.NODE_ENV === "production" ) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

/* runs when mr client connects */ 
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on('join', ({name, room}) => {
    const {user} = addUser({id:socket.id, name, room});
    socket.emit('message', {user:'admin', text:`Welcome to Room ${user.room}, ${user.name}!`}); 
    socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined ur room!`});
    socket.join(user.room);
  })

  socket.on('disconnect', () =>
    io.emit('o', 'someone has left')
  )
  socket.on('message', (message, callback) => {
    /* send it back out to everyone */
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {user: user.name, text:message});
    callback();
  });
});