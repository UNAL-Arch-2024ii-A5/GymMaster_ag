const typeDefs = `
  type MuscularGroup {
    muscleID: ID!
    muscleName: String!
  }

  type Exercise {
    id: ID!
    exerciseName: String!
    exerciseImage: String
    exerciseTime: Int
    exerciseSets: Int
    exerciseReps: Int
    muscularGroup: [MuscularGroup!]!
  }

  type Routine {
    id: ID!
    routineName: String!
    routineDifficulty: Int!
    routineExercises: [ID!]!
    routineMuscles: [MuscularGroup!]!
    imageUrl: String
    owner: String
    exercises: [Exercise!]  # Detailed exercise objects, optional if not always returned
  }

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

module.exports = { typeDefs };
