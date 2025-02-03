const axios = require('axios');

const exerciseMutations = {
  createExercise: async (_, { exerciseName, muscularGroup }) => {
    try {
      const payload = {
        exercise_name: exerciseName,
        muscular_group: muscularGroup.map(mg => ({
          muscle_id: mg.muscleID,
          muscle_name: mg.muscleName
        }))
      };

      const response = await axios.post(`http://localhost:3001/exercises`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating exercise:', error.message);
      throw new Error(error.response?.data || 'Failed to create exercise');
    }
  },

  updateExercise: async (_, args) => {
    try {
      // For update, expect an id along with the other fields.
      // If using an input wrapper, args.input will hold exerciseName and muscularGroup.
      const { id, exerciseName, muscularGroup } = args.input
        ? { id: args.id, ...args.input }
        : args;

      if (!muscularGroup) {
        throw new Error("muscularGroup is required");
      }

      const payload = {
        exercise_name: exerciseName,
        muscular_group: muscularGroup.map(mg => ({
          muscle_id: mg.muscleID,
          muscle_name: mg.muscleName
        }))
      };

      const response = await axios.put(`http://localhost:3001/exercises/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating exercise:', error.message);
      throw new Error(error.response?.data || 'Failed to update exercise');
    }
  },

  deleteExercise: async (_, { id }) => {
    try {
      await axios.delete(`http://localhost:3001/exercises/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting exercise:', error.message);
      throw new Error('Failed to delete exercise');
    }
  }
};

const routineMutations = {
  createRoutine: async (_, args) => {
    try {
      // Destructure from args.input if it exists
      const { routineName, routineDifficulty, routineExercises } = args.input || args;

      const payload = {
        routine_name: routineName,
        routine_difficulty: routineDifficulty,
        routine_exercises: routineExercises
      };

      const response = await axios.post(`http://localhost:3001/routines`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating routine:', error.message);
      throw new Error(error.response?.data || 'Failed to create routine');
    }
  },

  updateRoutine: async (_, args) => {
    try {
      // For update, combine id from args with the input fields if needed.
      const { id, routineName, routineDifficulty, routineExercises } = args.input
        ? { id: args.id, ...args.input }
        : args;

      const payload = {
        routine_name: routineName,
        routine_difficulty: routineDifficulty,
        routine_exercises: routineExercises
      };

      const response = await axios.put(`http://localhost:3001/routines/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating routine:', error.message);
      throw new Error(error.response?.data || 'Failed to update routine');
    }
  },

  deleteRoutine: async (_, { id }) => {
    try {
      await axios.delete(`http://localhost:3001/routines/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting routine:', error.message);
      throw new Error('Failed to delete routine');
    }
  }
};

module.exports = {
  ...exerciseMutations,
  ...routineMutations
};
