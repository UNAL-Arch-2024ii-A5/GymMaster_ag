const axios = require("axios");

const queries = {
    // ✅ Solo Admin puede ver todos los usuarios
    allUsers: async (_, __, userData) => {
        if (userData.role!=="admin") throw new Error("No tienes permisos para ver este perfil.")
        try {
            const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/all-users`);
            return response.data;
        } catch (error) {
            console.error("Error en allUsers:", error.message);
            throw new Error("No tienes permisos para ver todos los usuarios.");
        }
    },

    // ✅ Un usuario solo puede ver su propio perfil
    getUser: async (_, { _id },  userData) => {
        if ( userData.role !== "admin" &&  userData.id !== _id) throw new Error("No tienes permisos para ver este perfil.");

        try {
            const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/${userData.id}`);
            return response.data;
        } catch (error) {
            console.error("Error en getUser:", error.message);
            throw new Error("No se pudo obtener el usuario.");
        }
    }
};

module.exports = { queries };
