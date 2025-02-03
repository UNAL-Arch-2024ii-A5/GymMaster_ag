const axios = require('axios');

// Exercise Mutations
const exerciseMutations = {
  createExercise: async (_, { exerciseName, muscularGroup }) => {
    try {
      const payload = {
        exercise_name: exerciseName, // Match backend field name
        muscular_group: muscularGroup.map(mg => ({
          muscle_id: parseInt(mg.muscleID, 10), // Convert to number if required
          muscle_name: mg.muscleName
        }))
      };
      const response = await axios.post(`${process.env.EXERCISEMS_URL}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating exercise:', error.message);
      throw new Error(error.response?.data || 'Failed to create exercise');
    }
  },
  updateExercise: async (_, { id, exerciseName, muscularGroup }) => {
    try {
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
      const response = await axios.put(`${process.env.EXERCISEMS_URL}/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating exercise:', error.message);
      throw new Error(error.response?.data || 'Failed to update exercise');
    }
  },
  deleteExercise: async (_, { id }) => {
    try {
      await axios.delete(`${process.env.EXERCISEMS_URL}/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting exercise:', error.message);
      throw new Error('Failed to delete exercise');
    }
  }
};

// Routine Mutations
const routineMutations = {
  createRoutine: async (_, { routineName, routineDifficulty, routineExercises }) => {
    try {
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
  updateRoutine: async (_, { id, routineName, routineDifficulty, routineExercises }) => {
    try {
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