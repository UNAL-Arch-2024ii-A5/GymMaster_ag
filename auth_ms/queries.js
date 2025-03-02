const axios = require("axios");

const queries = {
    // ✅ Solo Admin puede ver todos los usuarios
    allUsers: async (_, { bearerToken }) => {
        if (!bearerToken) throw new Error("No autenticado");

        try {
            const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/all-users`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message);
            throw new Error("No tienes permisos para ver todos los usuarios.");
        }
    },

    // ✅ Un usuario solo puede ver su propio perfil
    getUser: async (_, { _id, bearerToken }) => {
        if (!bearerToken) throw new Error("No autenticado");

        try {
            const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/${_id}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });

            return response.data.getsUser;
        } catch (error) {
            console.error("Error al obtener el usuario:", error.message);
            throw new Error("No se pudo obtener el usuario.");
        }
    }
};

module.exports = {
    queries,
};

