const axios=require("axios");

const mutations = {
    // ✅ SOLO ADMIN y COACH pueden crear snapshots
    createSnapshot: async (_, {
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
    }) => {
        if (!user) throw new Error("No autenticado");
        if (role !== "admin" && role !== "coach") throw new Error("No tienes permisos");
        const response = await axios.post(`${process.env.SNAPSHOTS_URL}`, {
            userId: user.id, // 📌 Se asigna el usuario autenticado
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
    },{user,role}) => {
        if (!user) throw new Error("No autenticado");
        if (role !== "admin" && role !== "coach") throw new Error("No tienes permisos");
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
    deleteSnapshot: async (_, { id }, { user, role }) => {
        if (!user) throw new Error("No autenticado");
        if (role !== "admin") throw new Error("No tienes permisos");
        const response = await axios.delete(`${process.env.SNAPSHOTS_URL}/${id}`);
        return response.data;
    }
};


module.exports = {
    mutations,
};