const axios=require("axios");
const mutations= {
<<<<<<< HEAD
    createMachineMS: async (_, { name, description, state, type, serviceInterval }) => {
        const response = await axios.post(`${process.env.MACHINES_URL}`, {
          name,
          description,
          state,
          type,
          serviceInterval
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
=======
  // ✅ SOLO ADMIN puede crear máquinas
  createMachineMS: async (_, { name, description, state, type, lastService, serviceInterval }, userData) => {
    if (userData.role !== "admin") throw new Error("No tienes permisos");
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
  // ✅ SOLO ADMIN puede actualizar máquinas
  updateMachineMS: async (_, { id, name, description, state, lastService, serviceInterval }, userData) => {
    if (userData.role !== "admin") throw new Error("No tienes permisos");
    const response = await axios.put(`${process.env.MACHINES_URL}/${id}`, {
      name,
      description,
      state,
      lastService,
      serviceInterval,
    });
    return response.data;
  },
  // ✅ SOLO ADMIN puede eliminar máquinas
  deleteMachine: async (_, { id }, userData) => {
    if (userData.role !== "admin") throw new Error("No tienes permisos");
    const response = await axios.delete(`${process.env.MACHINES_URL}/${id}`);
    return response.data;
  },
  // ✅ SOLO ADMIN puede agregar servicios a una máquina
  addMachineService: async (_, { machineId, date, description }, userData) => {
    if (userData.role !== "admin") throw new Error("No tienes permisos");
    const response = await axios.post(`${process.env.MACHINES_URL}/${machineId}/services`, {
      date,
      description,
    });
    return response.data;
  }
>>>>>>> bfdea008a9259153076af0bf91d0738985ed3276
};

module.exports = {
    mutations,
};