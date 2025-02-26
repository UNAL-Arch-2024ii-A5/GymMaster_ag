const axios=require("axios");

const mutations = {
    createSnapshot: async (_, {
        userId,
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
        const response = await axios.post(`${process.env.SNAPSHOTS_URL}`, {
            userId,
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
    }) => {
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

    deleteSnapshot: async (_, { id }) => {
        const response = await axios.delete(`${process.env.SNAPSHOTS_URL}/${id}`);
        return response.data;
    }
};


module.exports = {
    mutations,
};