// queries.js
const axios = require('axios');

const exerciseQueries = {
  allExercises: async () => {
    try {
      const response = await axios.get(`${process.env.EXERCISEMS_URL}/exercises`);
      return response.data.map(exercise => ({
        id: exercise._id, // Assuming MongoDB ObjectId is returned as _id
        exerciseName: exercise.exercise_name,
        muscularGroup: exercise.muscular_group.map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      }));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw new Error('Failed to fetch exercises');
    }
  },
  getExercise: async (_, { id }) => {
    try {
      const response = await axios.get(`${process.env.EXERCISEMS_URL}/exercises/${id}`);
      const exercise = response.data;
      return {
        id: exercise._id,
        exerciseName: exercise.exercise_name,
        muscularGroup: exercise.muscular_group.map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw new Error('Exercise not found');
    }
  }
};

const routineQueries = {
  allRoutines: async () => {
    try {
      const response = await axios.get(`${process.env.EXERCISEMS_URL}/routines`);
      return response.data.map(routine => ({
        id: routine._id,
        routineName: routine.routine_name,
        routineDifficulty: routine.routine_difficulty,
        routineExercises: routine.routine_exercises,
        routineMuscles: routine.routine_muscles.map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      }));
    } catch (error) {
      console.error('Error fetching routines:', error);
      throw new Error('Failed to fetch routines');
    }
  },
  getRoutine: async (_, { id }) => {
    try {
      const response = await axios.get(`${process.env.EXERCISEMS_URL}/routines/${id}`);
      const routine = response.data;
      return {
        id: routine._id,
        routineName: routine.routine_name,
        routineDifficulty: routine.routine_difficulty,
        routineExercises: routine.routine_exercises,
        routineMuscles: routine.routine_muscles.map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };
    } catch (error) {
      console.error('Error fetching routine:', error);
      throw new Error('Routine not found');
    }
  }
};

module.exports = {
  ...exerciseQueries,
  ...routineQueries
};