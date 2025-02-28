const axios=require("axios");
const queries = {
    getMachineById: async (_, { id }) => {
        const response = await axios.get(`${process.env.MACHINES_URL}/${id}`);
        return response.data;
      },
      getAllMachines: async () => {
        const response = await axios.get(`${process.env.MACHINES_URL}`);
        return response.data;
      },
      getMachineServices: async (_, { machineId }) => {
        const response = await axios.get(`${process.env.MACHINES_URL}/${machineId}/services`);
        return response.data;
      },
      getAllTypes: async () => {
        const response = await axios.get(`${process.env.MACHINES_URL}/types`);
        return response.data;
      },
      getMachinesByType: async (_, { type }) => {
        const response = await axios.get(`${process.env.MACHINES_URL}/types/${type}`);
        return response.data;
      },
      getAvalableMachines: async (_, { state }) => {
        const response = await axios.get(`${process.env.MACHINES_URL}/avalability?state=${state}`);
        return response.data;
      }
};

module.exports = {
    queries,
};