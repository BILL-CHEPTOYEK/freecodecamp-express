require('dotenv').config();

let express = require('express');
let app = express();
console.log("Hello World");

// app.get('/', function(req, res) {
//  res.send("Hello Express");
//});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    const AbsolutePath = __dirname + '/views/index.html';
  res.sendFile(AbsolutePath);
});

app.get('/json', function(req, res) {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
  res.json({ "message": message });
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
});
app.get('/now', function(req, res) {
    res.json({ "time": req.time });
});































 module.exports = app;
