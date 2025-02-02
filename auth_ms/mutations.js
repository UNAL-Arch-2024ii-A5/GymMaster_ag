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
            console.error("Error al obtener el usuario:", error.message);
            throw new Error("No está autorizado.");
        }
        
    },
    loginCoach: async(_, {email, password})=>{
        try{
            const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/coach-login`,
                {email, password});
            return response.data;
        }catch(error){
            console.error("Error al obtener el usuario:", error.message);
            throw new Error("No está autorizado.");
        }
    },
    registerUser: async(_, {firstname, lastname, email, mobile, password, address, role})=>{
        try{
            const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/register`,
                {firstname, lastname, email, mobile, password, address, role}
            );
            return response.data;
        }catch(error){
            console.error("Error al crear usuario", error.message);
            throw new Error("Está ingresando mal los datos.");
        }
    },
    updateUser: async(_, {bearerToken, firstname, lastname, email, mobile, address, password})=>{
        const response = await axios.put(`${process.env.AUTHMS_URL}/api/user/edit-user`,{
            headers: {
                Authorization: `Bearer ${bearerToken}`, // Pasar el token al encabezado
            },
            ...(firstname && { firstname }),
            ...(lastname && { lastname }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(address&&{address}),
            ...(password && { password }),
        });
        return response.data;
    }

};

module.exports = {
    mutations,
};
