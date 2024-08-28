import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import authRoutes from './auth.js';

// This allows you to use __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(bodyParser.json());

app.use(morgan('combined'));


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../../dist')));

app.use('/api/auth', authRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
