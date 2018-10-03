
var express = require('express')
var router = express.Router();

// load all the controllers
const baseController = require('../controller/base.controller.js');
const nimbusController = require('../controller/nimbus-event.controller.js');
const subAppController = require('../controller/sub-app-controller.js');
const graphqlController = require('../controller/graphql.helloWorld.controller');
const coursesGraphqlController = require('../controller/graphql.courses.controller');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

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


// GraphQL
var express_graphql = require('express-graphql');

router.use('/graphql', express_graphql({
    schema: graphqlController.schema,
    rootValue: graphqlController.root,
    graphiql: true
}));
router.use('/courses', express_graphql({
    schema: coursesGraphqlController.schema,
    rootValue: coursesGraphqlController.root,
    graphiql: true
}));

var { graphql } = require('graphql');
graphql(
    graphqlController.schema,
    '{message}',
    graphqlController.root).then((response) => {
    console.log(response);
});

module.exports = router;