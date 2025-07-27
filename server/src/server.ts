import app from './app';

const PORT = 5000;

app.listen(PORT, 'localhost', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
