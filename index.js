const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const dotenv = require('dotenv');

const { typeDefs: typeDefsAuth } = require("./auth_ms/typeDefs");
const { queries: queriesAuth} = require("./auth_ms/queries");
const { typeDefs: testTypeDefsAuth } = require("./test_ms/typeDefs");
const { queries: testqueriesAuth} = require("./test_ms/queries");
const { mutations: mutationAuth} = require("./auth_ms/mutations");

const { typeDefs: typeDefsMachine } = require("./machines_ms/typeDefs");
const { mutations: mutationMachine} = require("./machines_ms/mutations");
const { queries: queriesMachine} = require("./machines_ms/queries");


const { typeDefs: typeDefsMonitoring } = require("./monitoring_ms/typeDefs");
const { queries: monitoringQueries } = require("./monitoring_ms/queries");
const { mutations: monitoringMutations } = require("./monitoring_ms/mutations");

const { typeDefs: typeDefsProgress } = require("./progress_ms/typeDefs");
const { mutations: mutationProgress} = require("./progress_ms/mutations");
const { queries: queriesProgress} = require("./progress_ms/queries");

const { typeDefs: typeDefsRoutine } = require("./routines_ms/typeDefs");
const queriesRoutine = require("./routines_ms/queries");  
const mutationsRoutine = require("./routines_ms/mutations");

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
		...testqueriesAuth

  },
	Mutation: {
		...mutationAuth,
    ...mutationMachine,
    ...mutationsRoutine,
    ...monitoringMutations,
    ...mutationProgress
	}
};

/**
 * 📌 Middleware de autenticación en el API Gateway
 * - Si NO hay token → **Error inmediato (No autenticado)**
 * - Si hay token, lo validamos con `auth_ms`
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";

    // 📌 Si no hay `Bearer Token`, rechazamos la solicitud de inmediato
    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("No autenticado");
    }

    const token = authHeader.split(" ")[1];

    try {
      // 📌 Validar el token con `auth_ms`
      const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/validate-token`, { token });

      return { user: response.data.user, role: response.data.user.role };
    } catch (error) {
      console.error("Error al validar token:", error.response?.data || error.message);
      throw new Error("Token inválido o expirado");
    }
  }
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 API Gateway listo en: ${url}`);
});
