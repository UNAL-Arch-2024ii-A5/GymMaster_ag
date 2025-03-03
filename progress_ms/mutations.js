const axios=require("axios");

const mutations = {
    // ✅ SOLO ADMIN y COACH pueden crear snapshots
    createSnapshot: async (_, { input }, userData) => {    
        let assignedUserId;
    
        // ✅ Si es coach o admin, permite asignar `userId`
        if (userData.role === "admin" || userData.role === "coach") {
            if (!input.userId) {
                throw new Error("Debes proporcionar un userId para asignar el snapshot.");
            }
            assignedUserId = input.userId;
        } else {
            // ✅ Si es user, solo puede crear snapshots para sí mismo
            assignedUserId = userData.id;
        }
    
        const response = await axios.post(`${process.env.SNAPSHOTS_URL}`, {
            userId: assignedUserId, // 📌 Se asigna el userId correcto
            ...input
        });
    
        return response.data;
    },
    
    // ✅ SOLO ADMIN y COACH pueden actualizar snapshots
    updateSnapshot: async (_, {
        id,
        weight,
        height,
        bodyFatPercentage,
        neck,
        waist,
        hip,
        chest,
        leftArm,
        rightArm,
        leftForearm,
        rightForearm,
        leftThigh,
        rightThigh,
        leftCalf,
        rightCalf,
        date
    },userData) => {
        if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
        const response = await axios.put(`${process.env.SNAPSHOTS_URL}/${id}`, {
            weight,
            height,
            bodyFatPercentage,
            neck,
            waist,
            hip,
            chest,
            leftArm,
            rightArm,
            leftForearm,
            rightForearm,
            leftThigh,
            rightThigh,
            leftCalf,
            rightCalf,
            date
        });
        return response.data;
    },
    // ✅ SOLO ADMIN puede eliminar snapshots
    deleteSnapshot: async (_, { id }, userData) => {
        if (userData.role !== "admin") throw new Error("No tienes permisos");
        const response = await axios.delete(`${process.env.SNAPSHOTS_URL}/${id}`);
        return response.data;
    }
};


module.exports = {
    mutations,
};