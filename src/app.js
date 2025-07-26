const express = require('express');
const noteRoutes = require('./routes/notes.routes');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Server is Running...</h1>');
});

app.use(express.json())
app.use('/notes',noteRoutes)









module.exports = app;