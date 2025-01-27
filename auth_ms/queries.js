const axios=require("axios");
const queries = {
    allUsers: async (_, {  }) => {
        const response = await axios.get(`${process.env.AUTHMS_URL}/api/user/all-users`);
    return response.data;
    },
    getUser: async(_, {id, bearerToken})=>{
        const response = await axios.get("")
    }
};

module.exports = {
    queries,
};
