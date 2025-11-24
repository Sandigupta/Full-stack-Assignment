import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import sequelize from './config/database.js';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync database models
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
