const axios=require("axios");
const mutations= {
    createMachine: async (_, { name, description, state, lastService, serviceInterval }) => {
        const response = await axios.post(`${process.env.MACHINES_URL}`, {
          name,
          description,
          state,
          lastService,
          serviceInterval,
        });
        return response.data;
      },
      updateMachine: async (_, { id, name, description, state, lastService, serviceInterval }) => {
        const response = await axios.put(`${process.env.MACHINES_URL}/${id}`, {
          name,
          description,
          state,
          lastService,
          serviceInterval,
        });
        return response.data;
      },
      deleteMachine: async (_, { id }) => {
        const response = await axios.delete(`${process.env.MACHINES_URL}/${id}`);
        return response.data;
      },
      addMachineService: async (_, { machineId, date, description }) => {
        const response = await axios.post(`${process.env.MACHINES_URL}/${machineId}/services`, {
          date,
          description,
        });
        return response.data;
      }
};

module.exports = {
    mutations,
};