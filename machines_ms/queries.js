const axios=require("axios");
const queries = {
  // ✅ Verificar logueo
  getMachineById: async (_, { id }) => {
    const response = await axios.get(`${process.env.MACHINES_URL}/${id}`);
    return response.data;
  },
  // ✅ Verificar logueo
  getAllMachines: async (_,__) => {
    const response = await axios.get(`${process.env.MACHINES_URL}`);
    return response.data;
  },
  // ✅ Verificar logueo
  getMachineServices: async (_, { machineId }) => {
    const response = await axios.get(`${process.env.MACHINES_URL}/${machineId}/services`);
    return response.data;
  },
  // ✅ Verificar logueo
  getAllTypes: async (_, __) => {
    const response = await axios.get(`${process.env.MACHINES_URL}/types`);
    return response.data;
  },
  // ✅ Verificar logueo  
  getMachinesByType: async (_, { type }) => {
    const response = await axios.get(`${process.env.MACHINES_URL}/types/${type}`);
    return response.data;
  },
  // ✅ Verificar logueo  
  getAvalableMachines: async (_, { state }) => {
    const response = await axios.get(`${process.env.MACHINES_URL}/avalability?state=${state}`);
    return response.data;
  }
};

module.exports = {
    queries,
};