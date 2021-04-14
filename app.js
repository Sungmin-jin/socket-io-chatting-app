const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const moment = require("moment");

const socketIO = require("socket.io");
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    data.time = moment(new Date()).format("h:mm A");
    io.emit("chatting", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
