// queries.js
const axios = require("axios");

const machinesQueries = {
  allMachines: async () => {
    try {
      const response = await axios.get(`${process.env.MONITORING_URL}/machine`);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching machines:", error);
      throw new Error("Failed to fetch machines");
    }
  },
  getMachinesByType: async (_, { type }) => {
    try {
      const response = await axios.get(
        `${process.env.MONITORING_URL}/machine/type/${type}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Machines:", error);
      throw new Error("Machines not found");
    }
  },
  getMachine: async (_, { id }) => {
    try {
      const response = await axios.get(
        `${process.env.MONITORING_URL}/machine/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Machines:", error);
      throw new Error("Machines not found");
    }
  },
};

const monitoringQueries = {
  allMonitoringEvents: async () => {
    try {
      const response = await axios.get(
        `${process.env.MONITORING_URL}/monitoring`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching monitoring events:", error);
      throw new Error("Failed to fetch monitoring events");
    }
  },
  getMonitoringEventByID: async (_, { id }) => {
    try {
      const response = await axios.get(
        `${process.env.MONITORING_URL}/monitoring/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching monitor event:", error);
      throw new Error("monitor event not found");
    }
  },
  getUsage: async (_, { type }) => {
    try {
      const response = await axios.get(
        `${process.env.MONITORING_URL}/monitoring/usage?type=${type}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching monitor event:", error);
      throw new Error("monitor event not found");
    }
  },
};

module.exports = {
  queries: {
    ...machinesQueries,
    ...monitoringQueries,
  },
};
