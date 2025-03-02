const axios=require("axios");

const queries = {
    // ✅ Admin-coach puede ver cualquier snapshot, el usuario solo puede ver los suyos
    getSnapshotById: async (_, { id }, { user, role }) => {
        if (!user) throw new Error("No autenticado");
        const response = await axios.get(`${process.env.SNAPSHOTS_URL}/${id}`);
        // 📌 Verifica si el usuario tiene permisos para ver este snapshot
        if (role !== "admin"  &&response.data.userId !== user.id) {
            throw new Error("No tienes permisos para ver este snapshot.");
        }
        return response.data;
    },
    // ✅ UAdmin-coach puede ver cualquier snapshot, el usuario solo puede ver los suyos
    getAllSnapshots: async (_, { user, role }) => {
        if (!user) throw new Error("No autenticado");
        if (role !== "admin"&& role !== "coach") throw new Error("No tienes permisos");
        const response = await axios.get(`${process.env.SNAPSHOTS_URL}`);
        return response.data;
    },
    // ✅ Un usuario solo puede ver sus propios snapshots
    getAllSnapshotsUser: async (_, { user }) => {
        if (!user) throw new Error("No autenticado");
        //getAllSnapshotsUser ya NO recibe userId, porque el API Gateway lo obtiene de context.user.id.
        const response = await axios.get(`${process.env.SNAPSHOTS_URL}/users/${user.id}`);
        return response.data;
    }
};

module.exports = {
    queries,
};