const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"],
//   },
// });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("유저 접속: ");

  socket.on("join_room", (username, room) => {
    console.log(`${username}님이 ${room}에 접속하였습니다.`);
    socket.join(room);
    socket.emit("welcome_msg", username);
  });

  socket.on("send_msg", (data) => {
    console.log(`data : ${data}`);
    console.log(data);

    socket.to(data.room).emit("receive_msg", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
