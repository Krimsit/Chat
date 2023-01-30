import express from "express"
import http from 'http';
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

io.on("connection", (socket) => {
  const room = `user_${socket.id}`

  socket.join(`user_${socket.id}`)

  socket.on("join", (data) => {
    socket.broadcast.emit("join", data)
    io.to(room).emit("SUCCESS:JOIN", data)
  })

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data)
    io.to(room).emit("SUCCESS:MESSAGE", data)
  });
})

server.listen(3003, () => {
  console.log("Server start in 3003 port")
})