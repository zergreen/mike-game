const express = require('express');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const port = process.env.PORT

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});