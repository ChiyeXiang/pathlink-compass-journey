import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import dotenv from 'dotenv';


const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);




app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
