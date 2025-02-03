const typeDefs =`
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

  input ExerciseInput {
    exerciseName: String!
    muscularGroup: [MuscularGroupInput!]!
  }

  input MuscularGroupInput {
    muscleID: ID!
    muscleName: String!
  }

  input RoutineInput {
    routineName: String!
    routineDifficulty: Int!
    routineExercises: [ID!]!
  }

  extend type Query {
    allExercises: [Exercise!]!
    getExercise(id: ID!): Exercise
    allRoutines: [Routine!]!
    getRoutine(id: ID!): Routine
  }

  extend type Mutation {
    createExercise(input: ExerciseInput!): Exercise
    updateExercise(id: ID!, input: ExerciseInput!): Exercise
    deleteExercise(id: ID!): ID
    createRoutine(input: RoutineInput!): Routine
    updateRoutine(id: ID!, input: RoutineInput!): Routine
    deleteRoutine(id: ID!): ID
  }
`;


module.exports ={
  typeDefs
};