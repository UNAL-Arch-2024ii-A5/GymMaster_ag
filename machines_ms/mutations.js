const axios=require("axios");
const mutations= {
    createMachineMS: async (_, { name, description, state, type, lastService, serviceInterval }) => {
        const response = await axios.post(`${process.env.MACHINES_URL}`, {
          name,
          description,
          state,
          type,
          lastService,
          serviceInterval,
        });
        return response.data;
      },
      updateUseMachine: async (_, { id }) => {
        const response = await axios.put(`${process.env.MACHINES_URL}/use/${id}`); 
        return response.data;
      },
      updateMachineMS: async (_, { id, name, description, state, lastService, serviceInterval }) => {
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