const axios=require("axios");

const queries = {
    getSnapshotById: async (_, { id }) => {
        const response = await axios.get(`${process.env.SNAPSHOTS_URL}/${id}`);
        return response.data;
      },
      getAllSnapshots: async () => {
        const response = await axios.get(`${process.env.SNAPSHOTS_URL}`);
        return response.data;
      },
      getAllSnapshotsUser: async (_, { userId }) => {
        const response = await axios.get(`${process.env.SNAPSHOTS_URL}/users/${userId}`);
        return response.data;
      }
};

module.exports = {
    queries,
};
