import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-app-7-vj9g.onrender.com", 
      "https://chat-app42.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} is now online`);
    io.emit("getOnlineUsers", { onlineUsers: Object.keys(userSocketMap) });
  }

  socket.on("disconnect", () => {
    if (userId && userSocketMap[userId]) {
      console.log(`User ${userId} disconnected`);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", { onlineUsers: Object.keys(userSocketMap) });
    }
  });
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId] || null;
};

export { app, io, server };
