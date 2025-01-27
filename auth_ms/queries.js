const axios=require("axios");
const queries = {
    allUsers: async (_, {  }) => {
        const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/all-users`);
    return response.data;
    },
    getUser: async (_, {_id , bearerToken }) => {
        try {
          // Hacer la solicitud a la API REST con el Bearer Token
          const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/${_id}`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`, // Pasar el token al encabezado
            },
          });
      
          // Devolver los datos del usuario
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
