const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs: typeDefsAuth } = require("./auth_ms/typeDefs");
const { queries: queriesAuth} = require("./auth_ms/queries");
const { typeDefs: testTypeDefsAuth } = require("./test_ms/typeDefs");
const { queries: testqueriesAuth} = require("./test_ms/queries");
const { mutations: mutationAuth} = require("./auth_ms/mutations");

const { typeDefs: typeDefsMachine } = require("./machines_ms/typeDefs");
const { mutations: mutationMachine} = require("./machines_ms/mutations");
const { queries: queriesMachine} = require("./machines_ms/queries");


const { typeDefs: typeDefsRoutine } = require("./routines_ms/typeDefs");
const queriesRoutine = require("./routines_ms/queries");  // Import exercise and routine queries
const mutationsRoutine = require("./routines_ms/mutations");  // Import exercise and routine mutations

const typeDefs = `
  ${typeDefsAuth}
  ${typeDefsMachine}
	${testTypeDefsAuth}
  ${typeDefsRoutine}
`;

const resolvers = {
  Query: {
    ...queriesAuth,
    ...queriesMachine,
		...testqueriesAuth,
    ...queriesRoutine
  },
	Mutation: {
		...mutationAuth,
    ...mutationMachine,
    ...mutationsRoutine
	}
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 API Gateway listo en: ${url}`);
});
