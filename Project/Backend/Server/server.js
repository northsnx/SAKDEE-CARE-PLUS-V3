// ไฟล์: server.js (หรือ app.js หลัก)
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const userRouter = require('../Routers/userRouter');
const climateRouter = require('../Routers/climateRouter');
const laundryRouter = require('../Routers/laundryRouter');
const newRouter = require('../Routers/newRouter');
const tipsRouter = require('../Routers/tipsRouter');

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api', userRouter);
app.use('/api', climateRouter);
app.use('/api', laundryRouter);
app.use('/api', newRouter);
app.use('/api', tipsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 