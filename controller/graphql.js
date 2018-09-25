
const { buildSchema } = require('graphql');
// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!'
};

exports.root = root;
exports.schema = schema;