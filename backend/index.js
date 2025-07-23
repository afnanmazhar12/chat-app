import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
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

// CORS setup
app.use(cors({
  origin: [
    'http://localhost:5000',
    'https://chat-app42.netlify.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all HTTP methods
  credentials: true, // Allow cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Routes
app.get('/home', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('frontend', 'dist', 'index.html'));
});

// Start the server
const startServer = async () => {
  await connectToMongoDB();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
