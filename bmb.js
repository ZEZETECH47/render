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

// Import routes
const pairRoute = require('./lib/pair');
const qrRoute = require('./lib/qr');

app.use('/pair', pairRoute);
app.use('/qr', qrRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
      
