import app from './app';
import {connectDB} from './config/database';

const PORT = 5000;

connectDB();

app.listen(PORT, 'localhost', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
