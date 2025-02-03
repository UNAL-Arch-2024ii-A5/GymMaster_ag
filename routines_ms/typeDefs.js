const typeDefs = `
  type MuscularGroup {
    muscleID: ID!  
    muscleName: String!
  }

  type Exercise {
    id: ID!
    exerciseName: String!
    muscularGroup: [MuscularGroup!]!  
  }

  type Routine {
    id: ID!
    routineName: String!
    routineDifficulty: Int!
    routineExercises: [ID!]!
    routineMuscles: [MuscularGroup!]!
  }

  # We still need an input type for nested objects.
  input MuscularGroupInput {
    muscleID: ID!
    muscleName: String!
  }

  extend type Query {
    allExercises: [Exercise!]!
    getExercise(id: ID!): Exercise
    allRoutines: [Routine!]!
    getRoutine(id: ID!): Routine
  }

  extend type Mutation {
    createExercise(
      exerciseName: String!,
      muscularGroup: [MuscularGroupInput!]!
    ): Exercise

    updateExercise(
      id: ID!,
      exerciseName: String!,
      muscularGroup: [MuscularGroupInput!]!
    ): Exercise

    deleteExercise(id: ID!): ID

    createRoutine(
      routineName: String!,
      routineDifficulty: Int!,
      routineExercises: [ID!]!
    ): Routine

    updateRoutine(
      id: ID!,
      routineName: String!,
      routineDifficulty: Int!,
      routineExercises: [ID!]!
    ): Routine

    deleteRoutine(id: ID!): ID
  }
`;

module.exports = {
  typeDefs
};
