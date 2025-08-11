import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile';

const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', profileRoutes); 



app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
