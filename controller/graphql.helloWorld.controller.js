
const { buildSchema } = require('graphql');
// GraphQL schema
exports.schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
exports.root = {
    message: () => 'Hello World!'
};
