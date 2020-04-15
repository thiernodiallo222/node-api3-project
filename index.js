// code away!
const express = require('express');
const app = express();
const userRoutes = require('./users/userRouter');
const welcome = require('./server');
app.use(express.json());   // auto format in json
const port = 5000;

app.use('/users', userRoutes);
app.use('/', welcome);
app.listen(port, () => console.log(`listening on port ${port}`));


