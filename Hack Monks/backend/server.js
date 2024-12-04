const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// Use CORS to allow cross-origin requests
app.use(cors()); // This will allow all origins; for production, specify your frontend URL

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
// const { errorHandler } = require('./middlewares/errorHandler');
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
