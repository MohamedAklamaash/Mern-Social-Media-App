const express = require("express");
const app = express();
const http = require("node:http");
const env = require("dotenv").config();
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let arr = [];
const removeDupUserId = (userId, socketId) => {
  !arr.some((user) => user.userId === userId) && arr.push({ userId, socketId });
};

const removeUserafterDisconnect = (socketId) => {
  arr = arr.filter((array) => array.socketId !== socketId);
};

const isReceiverIdPresent = (userId)=>{
    arr = arr.find((usr)=>usr.userId === userId);
}
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("addUser", (data) => {
    removeDupUserId(data.userId, socket.id);
    socket.emit("receive_msg", arr);
  });
  socket.on("disconnect", () => {
    removeUserafterDisconnect(socket.id);
    console.log("A user disconnected");
    socket.emit("receive_msg", arr);
  });
});

server.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
