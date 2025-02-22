const typeDefs = `

    type Machine {
        id: ID!
        name: String!
        description: String
        state: String
        lastService: String
        serviceInterval: Int
        type: String
        machineServices: [MachineService]
    }

    type MachineService {
        id: ID!
        date: String!
        description: String!
        machineId: ID!
    }

    type Response {
        message: String!
        statusCode: Int!
    }

    type TypesMachines {
        types: [String]
    }

    type Query {
        getMachineById(id: ID!): Machine
        getAllMachines: [Machine]
        getMachineServices(machineId: ID!): [MachineService]
        getAllTypes: TypesMachines
        getMachinesByType(type: String!): [Machine]
    }

    type Mutation {
        createMachine(name: String!, description: String, state: String, lastService: String, serviceInterval: Int): Machine
        updateMachine(id: ID!, name: String, description: String, state: String, lastService: String, serviceInterval: Int): Machine
        deleteMachine(id: ID!): Response
        addMachineService(machineId: ID!, date: String!, description: String!): MachineService
    }
`;

module.exports = {
    typeDefs,
  };
