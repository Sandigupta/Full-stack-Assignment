import express from 'express';
import cors from 'cors';
import languagesRoutes from './routes/languages.js';
import generateRoutes from './routes/generate.js';
import historyRoutes from './routes/history.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/languages', languagesRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Code Copilot API is running');
});

export default app;
