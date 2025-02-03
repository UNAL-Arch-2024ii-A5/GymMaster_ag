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
const { queries: queriesRoutine } = require("./routines_ms/queries");
const { mutations: mutationRoutine } = require("./routines_ms/mutations");

const { typeDefs: typeDefsMonitoring } = require("./monitoring_ms/typeDefs");
const { queries: monitoringQueries } = require("./monitoring_ms/queries");
const { mutations: monitoringMutations } = require("./monitoring_ms/mutations");

const { typeDefs: typeDefsProgress } = require("./progress_ms/typeDefs");
const { mutations: mutationProgress} = require("./progress_ms/mutations");
const { queries: queriesProgress} = require("./progress_ms/queries");


const typeDefs = `
  ${typeDefsAuth}
  ${typeDefsMachine}
  ${typeDefsProgress}
	${testTypeDefsAuth}
  ${typeDefsRoutine}
  ${typeDefsMonitoring}
`;

const resolvers = {
  Query: {
    ...queriesAuth,
    ...queriesMachine,
		...testqueriesAuth,
    ...queriesRoutine,
    ...monitoringQueries,
    ...queriesProgress,
		...testqueriesAuth

  },
	Mutation: {
		...mutationAuth,
    ...mutationMachine,
    ...mutationRoutine,
    ...monitoringMutations,
    ...mutationProgress
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
