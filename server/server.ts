import 'dotenv/config'; //loads .env keys first
import express from 'express';
import authRoutes from './routes/authRoutes';
import animeRoutes from './routes/animeRoutes';


const app = express ();

app.use(express.json()); // lets app read JSON from request 
app.use('/api/auth', authRoutes); // register them under /api/auth
app.use('/api/anime', animeRoutes)

const PORT = process.env.PORT || 3000; //checks if .env has PORT, else 3000
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)); //keeps it running


