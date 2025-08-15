import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import dotenv from 'dotenv';
import profileRouter from './routes/profile';
import chatRouter from './routes/chat'

const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', profileRouter); 
app.use('/api', chatRouter);



app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
