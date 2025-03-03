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
    updateUser: async (_,{firstname, lastname, email, mobile, address, password },userData) => {
        if (userData.role !== "admin" && userData.email !== email) throw new Error("No tienes permisos para modificar este usuario.");
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
    resetPassword: async (_, { token, password }) => {
        try {
        const response = await axios.put(
                `${process.env.AUTHMS_URL}/api/user/reset-password/${token}`,
            { password },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        return response.data;
        } catch (error) {
        console.error("Error en resetPassword:", error.response?.data || error.message);
        throw new Error("Error al resetear la contraseña: " + (error.response?.data?.message || error.message));
        }
    },
    deleteUser: async (_, { _id, bearerToken },  userData) => {
        if (userData.role !== "admin") throw new Error("No tienes permisos");
        try {
            const response = await axios.delete(`${process.env.AUTHMS_URL}/api/user/${_id}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`, // Pasar el token al encabezado
                },
            });
            return response.data.deletesUser;
        } catch (error) {
            console.error("Error al borrar el usuario:", error.response?.data || error.message);
            throw new Error("No se pudo borrar el usuario."+ (error.response?.data?.message || error.message));
        }
    },
    assignRoutine: async (_, { userId, routineId }, userData) => {
        if (userData.role !== "admin" && userData.role !=="coach" ) throw new Error("No tienes permisos");
        try {
            const response = await axios.post(
                `${process.env.ROUTINES_MS_URL}/api/routines/assign`,
                { userId, routineId },
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error al asignar rutina:", error.response?.data || error.message);
            throw new Error("No se pudo asignar la rutina.");
        }
    },
    forgotPasswordT: async (_,{email, mobile})=>{
        try{
            const response = await axios.post(`${process.env.AUTHMS_URL}/api/user/forgot-password-token`,
            {
                email, mobile
            });
            return response.data;
        }catch(error){
            console.error("Error al crear usuario", error.response?.data || error.message);
            throw new Error("Está ingresando mal los datos."+ (error.response?.data?.message || error.message));
        }
    }
}
module.exports = {
    mutations,
};
