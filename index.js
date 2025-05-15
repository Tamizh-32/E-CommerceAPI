const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const path = require('path');

// Routes and Middleware
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const chatSocket = require('./sockets/chatSocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',  // Allow all origins (for production, restrict this to your domain)
    methods: ['GET', 'POST'],
  },
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("MongoDB Connection Failed", error));

// Middlewares
app.use(express.json());
app.use(helmet());  // Security headers for enhanced protection
app.use(cors());  // Enable CORS (adjust as needed)
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for chat page
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// API routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Socket.IO setup
chatSocket(io);

// Start server (ensure HTTPS in production)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
