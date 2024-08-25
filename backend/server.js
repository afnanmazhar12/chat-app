import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectTOMongoDB.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use (cookieParser());

// Simple route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the /api/auth prefix for auth routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);


// Start the server
app.listen(PORT, () => {
 connectToMongoDB();


    
    console.log(`Server is running on http://localhost:${PORT}`);
});

