const axios=require("axios");
const mutations= {
    loginUsuarios: async (_, {email, password }) => {
        const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/login`,
            {email, password}
        );
    return response.data;
    },
    loginAdmin: async(_, {email, password})=>{
        try{
            const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/admin-login`,
                {email,password});
            return response.data;

        }catch(error){
            console.error("Error al obtener el usuario:", error.response?.data || error.message);
            throw new Error("No está autorizado."+ (error.response?.data?.message || error.message));
        }
        
    },
    loginCoach: async(_, {email, password})=>{
        try{
            const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/coach-login`,
                {email, password});
            return response.data;
        }catch(error){
            console.error("Error al obtener el usuario:", error.response?.data || error.message);
            throw new Error("No está autorizado."+ (error.response?.data?.message || error.message));
        }
    },
    registerUser: async(_, {firstname, lastname, email, mobile, password, address, role})=>{
        try{
            const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/register`,
                {firstname, lastname, email, mobile, password, address, role}
            );
            return response.data;
        }catch(error){
            console.error("Error al crear usuario", error.response?.data || error.message);
            throw new Error("Está ingresando mal los datos."+ (error.response?.data?.message || error.message));
        }
    },
    updateUser: async (_,{ bearerToken, firstname, lastname, email, mobile, address, password }) => {
        try {
        const data = {
            ...(firstname && { firstname }),
            ...(lastname && { lastname }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(address && { address }),
            ...(password && { password }),
        };
        const response = await axios.put(
            `${process.env.AUTHMS_URL}/api/user/edit-user`,
            data,
            {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
            }
        );
        return response.data;
        } catch (error) {
          // Imprime información detallada para depurar
        console.error("Error en updateUser:", error.response?.data || error.message);
        throw new Error("Error al actualizar el usuario: " + (error.response?.data?.message || error.message));
        }
    },

};

module.exports = {
    mutations,
};
