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

app.get('/', function (request, response) {
  console.log ('home');
  response.writeHead(200, "OK", {'Content-Type': 'text/html'});
  response.write('<html><head><title>Creating the Nimbus event</title></head><body>');
  response.write('yoyoyoyoy');
  response.write('</body></html>');
  response.end();
});

app.post('/createNimbusEvent', function (request, response) {
  console.log ('createNimbusEvent');

  var data = {
    ruleId: request.body.ruleId,
    description: request.body.description,
    startDateTime: request.body.startDateTime,
    endDateTime: request.body.endDateTime
  };

  console.log('received request' + request.body);

  mongoHelper.insert(data, null ,function(retValue) {
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(retValue));
  });
});


app.get('/retrieveAllEvents', function (request, response) {
  console.log ('retrieveAllEvents');

  var allEvents = mongoHelper.find({ }, null, function(retValue) {
    console.log('Return value: ' + retValue);

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(retValue));
  })
});

/**
* Start serving the app.
*/
app.listen(app.get('port'), function() {
    console.log('Nimbus Service is running on port', app.get('port'));
});
