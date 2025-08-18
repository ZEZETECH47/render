const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const app = express();

// Set static folder (public for html/css/js)
app.use(express.static(path.join(__dirname, 'public')));

// Serve JS files in 'lib' folder if needed
app.use('/lib', express.static(path.join(__dirname, 'lib')));

// Body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom route imports (✅ corrected paths)
let server = require('./lib/qr');
let code = require('./lib/pair');
require('events').EventEmitter.defaultMaxListeners = 500;

// API routes
app.use('/qr', server);
app.use('/code', code);

// Serve specific HTML files
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.listen(PORT, () => {
    console.log(`
Bmb-Tech-code is Live

Server running on http://localhost:` + PORT)
});

module.exports = app;
