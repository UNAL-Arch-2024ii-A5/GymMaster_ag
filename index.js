const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const { typeDefs: typeDefsAuth } = require("./auth_ms/typeDefs");
const { queries: queriesAuth } = require("./auth_ms/queries");
const { typeDefs: testTypeDefsAuth } = require("./test_ms/typeDefs");
const { queries: testqueriesAuth } = require("./test_ms/queries");
const { mutations: mutationAuth } = require("./auth_ms/mutations");

const { typeDefs: typeDefsMachine } = require("./machines_ms/typeDefs");
const { mutations: mutationMachine } = require("./machines_ms/mutations");
const { queries: queriesMachine } = require("./machines_ms/queries");

const { typeDefs: typeDefsMonitoring } = require("./monitoring_ms/typeDefs");
const { queries: monitoringQueries } = require("./monitoring_ms/queries");
const { mutations: monitoringMutations } = require("./monitoring_ms/mutations");

const { typeDefs: typeDefsProgress } = require("./progress_ms/typeDefs");
const { mutations: mutationProgress } = require("./progress_ms/mutations");
const { queries: queriesProgress } = require("./progress_ms/queries");

const { typeDefs: typeDefsRoutine } = require("./routines_ms/typeDefs");
const queriesRoutine = require("./routines_ms/queries");
const mutationsRoutine = require("./routines_ms/mutations");

const secretKey = "mysecret";

dotenv.config();

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
    ...testqueriesAuth,
  },
  Mutation: {
    ...mutationAuth,
    ...mutationMachine,
    ...mutationsRoutine,
    ...monitoringMutations,
    ...mutationProgress,
  },
};

/**
 * 📌 Middleware de autenticación en el API Gateway
 * - Si NO hay token → **Error inmediato (No autenticado)**
 * - Si hay token, lo validamos con `auth_ms`
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async (object) => {
    const { req } = object;
    const operationsSkiped = ["loginadmin","loginAdmin","registerUser", "resetPassword","forgotPasswordT"];
    console.log(req.body);
    if (!operationsSkiped.includes(req.body?.operationName?.toLowerCase())) {
      // get the user token from the headers
      const token = req.headers.authorization || "";
      try {
        const userData = jwt.verify(token, secretKey);
        console.log("Token válido:", userData);
        return userData;
      } catch (err) {
        console.error("Token inválido:", err.message);
      }
    }
  },
}).then(({ url }) => {
  console.log(`🚀 API Gateway listo en: ${url}`);
});
