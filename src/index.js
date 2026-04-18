const express = require('express');
const dotenv = require('dotenv');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Feature Flag Service is running'
  });
});

app.use('/applications', applicationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});