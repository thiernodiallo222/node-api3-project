// code away!
const express = require('express');
const app = express();
const userRoutes = require('./users/userRouter');
const postRouters = require('./posts/postRouter');
require('dotenv').config();
const welcome = require('./server');
const cors = require('cors');

app.use(express.json());   // auto format in json
const port = process.env.PORT||5000;

app.use(cors());
app.use('/users', userRoutes);
app.use('/posts', postRouters);
app.use('/', welcome);
app.listen(port, () => console.log(`listening on port ${port}`));


