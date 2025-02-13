import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 