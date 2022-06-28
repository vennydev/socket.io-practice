const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket);
  console.log("유저 접속: ");
  socket.on("join", (name, room) => {
    console.log(`${name}님이 ${room}에 접속하였습니다.`);
    socket.join(room);
    socket.emit("welcome_msg", username);
  });
});

socket.on("send_msg", (data) => {
  socket.to(data.room).emit("reveive_msg", data);
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
