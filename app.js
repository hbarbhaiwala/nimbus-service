const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const mongoHelper = require('./lib/mdbHelper.js');
const objectId = require('mongodb').ObjectId;

/**
 * Set up our server and static page hosting
 */
const app = express();
app.use(express.static('public'));
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

/**
 * A POST endpoint to obtain a merchant session for Apple Pay.
 * The client provides the URL to call in its body.
 * Merchant validation is always carried out server side rather than on
 * the client for security reasons.
 */
 app.get('/', function (request, response) {
  console.log ('home');
  response.writeHead(200, "OK", {'Content-Type': 'text/html'});
  response.write('<html><head><title>Creating the Nimbus event</title></head><body>');
  response.write('yoyoyoyoy');
  response.write('</body></html>');
  response.end();
});

app.get('/createNimbusEvent', function (request, response) {
  console.log ('createNimbusEvent');
});

/**
* Start serving the app.
*/
app.listen(app.get('port'), function() {
    console.log('Nimbus Service is running on port', app.get('port'));
});
