const nimbus_model = require('./nimbus-event/models/nimbus-event.model');
const mongoHelper = require('../lib/mdbHelper');
const querystring = require('querystring');

// Create and Save a new Note
exports.create = (req, res) => {

    console.log('received request' + req.body);

    var data = {
        ruleId: req.body.ruleId,
        description: req.body.description,
        startDateTime: new Date(req.body.startDateTime),
        endDateTime: new Date(req.body.endDateTime)
    };

    mongoHelper.insert(data, null ,function(retValue) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(retValue));
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    var allEvents = mongoHelper.find({ }, null, function(retValue) {
        console.log('Return value: ' + retValue);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(retValue));
    })
};

// Retrieve and return all notes that match a query from the database.
exports.find = (req, res) => {
    console.log ('retrieveEvent');

    // get query params as object
    var queryParams;
    if (req.url.indexOf('?') >= 0) {
        queryParams = querystring.parse(req.url.replace(/^.*\?/, ''));
    }

    console.log('hahahaha::: ' + req.query.startDate);

    var dbQuery = {
        startDateTime:  {   $gte: new Date(queryParams.startDate)   },
        //endDateTime:    {   $lte: new Date(queryParams.endDate)     }
    };

    console.log ('db query:');
    console.log(dbQuery);

    var allEvents = mongoHelper.find( dbQuery, null, function(retValue) {
        console.log('Return value: ' + retValue);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(retValue));
    })
};

exports.findWithId = (req, res) => {

    var allEvents = mongoHelper.find({ ruleId: req.params.id }, null, function(retValue) {
        console.log('Return value: ' + retValue);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(retValue));
    })
}

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};