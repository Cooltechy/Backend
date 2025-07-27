const express = require('express');
const authRoutes = require('./routes/auth.routes')

const app = express();


app.get('/', (req, res) => {
    res.send('<h1>Server is Running...</h1>');
});

app.use(express.json());
app.use('/auth',authRoutes)

module.exports = app;