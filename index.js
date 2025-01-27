const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs: typeDefsAuth } = require("./auth_ms/typeDefs");
const { queries: queriesAuth} = require("./auth_ms/queries");
const { typeDefs: testTypeDefsAuth } = require("./test_ms/typeDefs");
const { queries: testqueriesAuth} = require("./test_ms/queries");
const { mutations: mutationAuth} = require("./auth_ms/mutations")
const typeDefs = `
  ${typeDefsAuth}
	${testTypeDefsAuth}
`;

const resolvers = {
  Query: {
    ...queriesAuth,
		...testqueriesAuth
  },
	Mutation: {
		...mutationAuth
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
