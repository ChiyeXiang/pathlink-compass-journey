import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import profileRoute from './routes/profile';
import chatRoute from './routes/chat'

const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', profileRoute); 
app.use('/api', chatRoute);



app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
