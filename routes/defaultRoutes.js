
var express = require('express')
var router = express.Router();

// load all the controllers
const baseController = require('../controller/base.controller.js');
const nimbusController = require('../controller/nimbus-event.controller.js');
const subAppController = require('../controller/sub-app-controller.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// For all routes do some logging
router.all('*', baseController.log);

// loading the sub application above applications routes
router.use('/subapp', subAppController.routes);

// Base controller routes
router.get('/', baseController.root);
router.get('/foo', baseController.foo);

// Nimbus-event controller routes
router.post('/createNimbusEvent', nimbusController.create);
router.get('/retrieveAllEvents', baseController.middleware, nimbusController.findAll);
router.get('/retrieveEvent', nimbusController.find);
router.get('/nimbus-event/:id', nimbusController.findWithId);

module.exports = router;