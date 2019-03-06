/**
 * Main express setup and entry point
 */

import express = require('express');
import bodyParser = require('body-parser');

// Create a new express application instance
const app = express();
app.use(bodyParser.text({ type: ['text/xml', 'application/xml'] }));

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});

app.listen(process.env.PORT || 3000);

const consult = require('./consult/consult');
app.use('/consult', consult);

app.use(express.static(__dirname + '/public'));