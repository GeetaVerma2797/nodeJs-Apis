const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
app.set('port', port);
const path = require('path');



let details = require('./routes/userDetails');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request with, Content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, PATCH");
    next();
});


app.use('/api',details);
module.exports = app;
// console.log("routes geeta", app)
app.listen(port, () => {
    console.log('Listening on port: ', port);
});


