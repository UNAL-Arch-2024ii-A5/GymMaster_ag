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

  type Query {
    allUsers: [User]
    getUser(_id: ID!, bearerToken: String): User
  }
  
  type Mutation {
    loginUsuarios(email: String!, password: String!): LoginGeneralResponse
    loginAdmin(email: String!, password: String!): LoginAdminResponse
    loginCoach(email: String!, password: String!): LoginAdminResponse
    registerUser(firstname: String!, lastname: String!, email: String!, mobile: String!, password: String!, address: String!, role: String): RegisterResponse
    forgotPasswordT(email: String!, mobile: String!): ForgotPassword
  }
`;

module.exports = {
  typeDefs,
};
