const typeDefs = `
  type MachineElement {
    _id: ID  
    name: String
    state: String
    type: String
  }

  type MachineUsage {
    _id: ID  
    availableMachines: String
    totalMachines: String
  }

  type MonitoringElement {
    _id: ID
    name: String
    machineID: String
    startDate: String
    endDate: String
    userID: String
  }

  input MachineInput {
    _id: ID  
    name: String
    state: String
    type: String
  }

  input MonitoringInput {
    _id: ID
    name: String
    machineID: String
    startDate: String
    endDate: String
    userID: String
  }

  type Query {
    allMachines: [MachineElement]
    getMachine(id: ID): MachineElement
    allMonitoringEvents: [MonitoringElement]
    getMonitoringEventByID(id: ID): [MonitoringElement]
    getUsage(type: String): [MachineUsage]
  }

  type Mutation {
    createMachine(input: MachineInput): MachineElement
    updateMachine(input: MachineInput): MachineElement
    createMonitoringEvent(input: MonitoringInput): MonitoringElement
    closeMonitoringEvent(id: ID): MonitoringElement
  }
`;

module.exports = {
  typeDefs,
};
