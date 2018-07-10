+import express from 'express';
 +import bodyParser from 'body-parser';
 +import https from 'https';
 +import request from 'request';
 +
 +/**
 +* Set up our server and static page hosting
 +*/
 +const app = express();
 +app.use(express.static('public'));
 +app.use(bodyParser.json());
 +
 +
 +/**
 +* A POST endpoint to obtain a merchant session for Apple Pay.
 +* The client provides the URL to call in its body.
 +* Merchant validation is always carried out server side rather than on
 +* the client for security reasons.
 +*/
 +app.post('/createNimbusEvent', function (req, res) {
    // received a sms
    console.log ('createNimbusEvent');

    response.writeHead(200, "OK", {'Content-Type': 'text/html'});
    response.write('<html><head><title>Creating the Nimbus event</title></head><body>');
    response.write('yoyoyoyoy');
    response.write('</body></html>');
    response.end();+
 +});
 +
 +/**
 +* Start serving the app.
 +*/
 +https.createServer({
 +}, app).listen(443);
