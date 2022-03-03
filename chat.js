const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://hardcore-kepler-5bee6e.netlify.app",
    ],
  },
});
const port = process.env.PORT || 4000;
console.log("starting up.........");
const cors = require("cors");
const { uptime } = require("process");
const clients = { bathroom: [], livingRoom: [], lobby: [] };
let lobby = "lobby";
let rooms = [[], []];
let bathroom = [];
io.on("connection", (socket) => {
  socket.on("join lobby", (username) => {
    socket.join("lobby");
  });

  socket.on("enter room", (name, room) => {
    socket.join(room);
    if (!rooms[room].includes(name)) {
      rooms[room].push(name);
    }
    io.to(room).emit("player list", rooms[room]);
    if (rooms[room].length === 2) {
      io.to(room).emit("new message", `${rooms[room][0]} vs ${rooms[room][1]}`);
    }
    io.to("lobby").emit("room list", rooms);
  });

  socket.on("new message", (msg, room) => {
    console.log(msg);
    io.to(room).emit("new message", msg);
  });

  socket.on("new move", (move, room) => {
    io.to(room).emit("new move", move);
  });

  socket.on("leave room", (name, room) => {
    lobby = room;
    // if (!clients.rooms.includes(room)) {
    //   clients.rooms.push(room);
    // }
    rooms[room].splice(rooms[room].indexOf(name), 1);
    io.to(room).emit("player list", rooms[room]);
  });
});

server.listen(port, () => console.log("server is listening on port: " + port));
