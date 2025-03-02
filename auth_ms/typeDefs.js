const typeDefs = `
    type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    mobile: String!
    password: String!
    role: String
    isBlocked: Boolean
    address: String!
    refreshToken: String
    routines: [String]
    images: [String]
    ratings: [Rating]
    totalrating: String
    passwordChangeAt: String
    passwordResetToken: String
    passwordResetExpires: String
  }

  type Rating {
    star: Int
    comment: String
    postedby: ID
  }
  type LoginGeneralResponse {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    mobile: String!
    token: String!
  }
  type LoginAdminResponse {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    mobile: String!
    address: String!
    token: String!
  }
  type RegisterResponse {
    firstname: String!
    lastname: String!
    email: String!
    mobile: String!
    password: String!
    role: String
    isBlocked: Boolean
    address: String!
    routines: [String]
    images: [String]
    totalrating: String
    _id: ID!
    ratings: [Rating]
    createdAt: String
    updatedAt: String
  }
  type ForgotPassword {
    token: String!
  }
  type ResponseUpdateUser {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    mobile: String!
    password: String!
    role: String
    isBlocked: Boolean
    address: String!
    routines: [String]
    images: [String]
    ratings: [Rating]
    totalrating: String
    createdAt: String
    updatedAt: String
    refreshToken: String
    passwordResetExpires: String
    passwordResetToken: String
  }
  type ResponseUpdatePassword{
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    mobile: String!
    password: String!
    role: String
    isBlocked: Boolean
    address: String!
    routines: [String]
    images: [String]
    ratings: [Rating]
    totalrating: String
    createdAt: String
    updatedAt: String
    refreshToken: String
  }


  type Query {
    allUsers: [User]
    getUser(_id: ID!): User
  }
  
  type Mutation {
    loginUsuarios(email: String!, password: String!): LoginGeneralResponse
    loginAdmin(email: String!, password: String!): LoginAdminResponse
    loginCoach(email: String!, password: String!): LoginAdminResponse
    registerUser(firstname: String!, lastname: String!, email: String!, mobile: String!, password: String!, address: String!, role: String): RegisterResponse
    forgotPasswordT(email: String!, mobile: String!): ForgotPassword
    updateUser(bearerToken: String, firstname: String, lastname: String, email: String!, mobile: String, password: String!, address: String):ResponseUpdateUser
    resetPassword(token: String!, password: String!): ResponseUpdatePassword
    deleteUser(_id: ID!): User
    assignRoutine(userId: ID!, routineId: ID!): User 

  }

`;

module.exports = {
  typeDefs,
};
