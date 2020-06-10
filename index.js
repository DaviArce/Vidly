const genres = require('./routes/genres.js');
const express  = require('express');
const app = express();

app.use(express.json());

app.use('/api/generos',genres);
//Conecta a uma porta
const port = process.env.PORT || 3000;
app.listen(port,console.log(`Listen to ${port}`)); 