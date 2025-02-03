const axios = require("axios");

const machineMutations = {
  createMachine: async (_, { input }) => {
    try {
      const response = await axios.post(
        `${process.env.MONITORING_URL}/machine`,
        input
      );
      return response.data;
    } catch (error) {
      console.error("Error creating Machine:", error.message);
      throw new Error(error.response?.data || "Failed to create Machine");
    }
  },
  updateMachine: async (_, { id, input }) => {
    try {
      const response = await axios.put(
        `${process.env.MONITORING_URL}/machine/${id}`,
        input
      );
      return response.data;
    } catch (error) {
      console.error("Error updating machine:", error.message);
      throw new Error(error.response?.data || "Failed to update machine");
    }
  },
};

const monitoringMutations = {
  createMonitoringEvent: async (_, { input }) => {
    try {
      const response = await axios.post(
        `${process.env.MONITORING_URL}/monitoring`,
        input
      );
      return response.data;
    } catch (error) {
      console.error("Error creating monitor event:", error.message);
      throw new Error(error.response?.data || "Failed to create monitor event");
    }
  },
  closeMonitoringEvent: async (_, { id, input }) => {
    try {
      const response = await axios.put(
        `${process.env.MONITORING_URL}/monitoring/close/${id}`,
        input
      );
      return response.data;
    } catch (error) {
      console.error("Error updating monitor event:", error.message);
      throw new Error(error.response?.data || "Failed to update monitor event");
    }
  },
};

module.exports = {
  mutations: {
    ...machineMutations,
    ...monitoringMutations,
  },
};
