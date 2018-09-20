const express = require('express');
const bodyParser = require('body-parser');

const defaultRoutes = require('./routes/defaultRoutes')

/**
 * Set up our server and static page hosting
 */
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(bodyParser.json());

app.use("/", defaultRoutes);

/**
* Start serving the app.
*/
app.listen(app.get('port'), function() {
    console.log('Nimbus Service is running on port', app.get('port'));
});
