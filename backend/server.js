import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path'; // Correct import for the path module

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectTOMongoDB.js";

const __dirname = path.resolve(); // Fixed the capitalization

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());


app.get('/home', (req, res) => {
  res.send('Hello, World!');
});

// Use the /api/auth prefix for auth routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "frontend", "dist"))); // Fixed path

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
