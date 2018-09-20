const express = require('express');
const bodyParser = require('body-parser');
const baseController = require('./controller/base.controller.js');
const nimbusController = require('./controller/nimbus-event.controller.js');
const subAppController = require('./controller/sub-app-controller.js');

/**
 * Set up our server and static page hosting
 */
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(bodyParser.json());

app.all('*', baseController.log);

app.use('/subapp', subAppController.routes);

app.get('/', baseController.root);
app.get('/foo', baseController.foo);





app.post('/createNimbusEvent', nimbusController.create);
app.get('/retrieveAllEvents', baseController.middleware, nimbusController.findAll);
app.get('/retrieveEvent', nimbusController.find);
app.get('/nimbus-event/:id', nimbusController.findWithId);

/**
* Start serving the app.
*/
app.listen(app.get('port'), function() {
    console.log('Nimbus Service is running on port', app.get('port'));
});
