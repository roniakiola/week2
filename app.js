'use strict';
const express = require('express');
const cors = require('cors');

const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cat', catRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/user/:id', function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(80, function(){
    console.log('CORS-enabled web server listening on port 80');
});
