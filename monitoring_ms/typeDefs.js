const typeDefs =`
  type MachineElement {
    id: ID!  
    name: String!
    state: String!
    type: String!
  }

  type MachineUsage {
    id: ID!  
    availableMachines: Number!
    totalMachines: Number!
  }

  type MonitoringElement {
    id: ID
    name: String!
    machineID: String!
    startDate: String!
    endDate: String
    userID: String
  }

  input MachineInput {
    id: ID  
    name: String!
    state: String!
    type: String!
  }

  input MonitoringInput {
    id: ID
    name: String
    machineID: String
    startDate: String
    endDate: String
    userID: String
  }

  extend type Query {
    allMachines: [MachineElement!]!
    getMachine(id: ID!): MachineElement
    getMachinesByType(type: String!): [MachineElement!]!
    allMonitoringEvents: [MonitoringElement!]!
    getMonitoringEventByID(id: ID!): [MonitoringElement!]!
    getUsage(type: String!): [MachineUsage!]!
  }

  extend type Mutation {
    createMachine(input: MachineInput!): Machine
    updateMachine(input: MachineInput!): Machine
    createMonitoringEvent(input: MonitoringInput!): MonitoringElement
    closeMonitoringEvent(id: ID!): MonitoringElement
  }
`;


module.exports ={
  typeDefs
};