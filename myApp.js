require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();
console.log("Hello World");



// app.get('/', function(req, res) {
//  res.send("Hello Express");
//});

app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.post('/name', function(req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ "name": `${firstName} ${lastName}` });
}
);

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
},
function(req, res) {
    res.json({ "time": req.time });
});

app.get('/:word/echo', function(req, res) {
    const word = req.params.word;
    res.json({ "echo": word });
});

app.get('/name', function(req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({ "name": `${firstName} ${lastName}` });
});






























 module.exports = app;
