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

    type MachineResponse {
        message: String
        statusCode: Int
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
        getAvalableMachines(state: String): [Machine]
    }

    type Mutation {
        createMachineMS(name: String!, description: String, state: String, type:String, serviceInterval: Int): Machine
        updateMachineMS(id: ID!, name: String, description: String, state: String, type:String, lastService: String, serviceInterval: Int): Machine
        updateUseMachine(id: ID!): String
        deleteMachine(id: ID!): MachineResponse
        addMachineService(machineId: ID!, date: String!, description: String!): MachineService
    }
`;

module.exports = {
    typeDefs,
};
