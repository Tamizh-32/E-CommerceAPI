const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const chatSocket = require('./sockets/chatSocket');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("MongoDB Connection Failed", error));

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));

// Routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);


chatSocket(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
