const express = require("express");
const app = express();
const http = require("http");
const env = require("dotenv").config();
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let arr = []; // Initialize arr as an empty array

const removeDupUserId = (userId, socketId) => {
  // Use arr after it's been defined
  !arr.some((user) => user.userId === userId) && arr.push({ userId, socketId });
};

const removeUserafterDisconnect = (socketId) => {
  arr = arr.filter((array) => array.socketId !== socketId);
};

const isReceiverIdPresent = (userId) => {
  const findArr = arr.find((usr) => usr.userId === userId);
  console.log(findArr);
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("addUser", (data) => {
    console.log("in add user event",data);
    removeDupUserId(data.userId, socket.id);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    const receiver = isReceiverIdPresent(data.userId);
    socket.to(arr[0].socketId).emit("receive_message",data);
  });

  socket.on("disconnect", () => {
    removeUserafterDisconnect(socket.id);
    console.log("A user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
