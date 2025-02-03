const axios = require('axios');

const exerciseMutations = {
  createExercise: async (_, { input }) => {
    try {
      const response = await axios.post(`${process.env.ROUTINES_URL}/exercises`, input);
      return response.data;
    } catch (error) {
      console.error('Error creating exercise:', error.message);
      throw new Error(error.response?.data || 'Failed to create exercise');
    }
  },
  updateExercise: async (_, { id, input }) => {
    try {
      const response = await axios.put(`${process.env.ROUTINES_URL}/exercises/${id}`, input);
      return response.data;
    } catch (error) {
      console.error('Error updating exercise:', error.message);
      throw new Error(error.response?.data || 'Failed to update exercise');
    }
  },
  deleteExercise: async (_, { id }) => {
    try {
      await axios.delete(`${process.env.ROUTINES_URL}/exercises/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting exercise:', error.message);
      throw new Error('Failed to delete exercise');
    }
  }
};

const routineMutations = {
  createRoutine: async (_, { input }) => {
    try {
      const response = await axios.post(`${process.env.ROUTINES_URL}/routines`, input);
      return response.data;
    } catch (error) {
      console.error('Error creating routine:', error.message);
      throw new Error(error.response?.data || 'Failed to create routine');
    }
  },
  updateRoutine: async (_, { id, input }) => {
    try {
      const response = await axios.put(`${process.env.ROUTINES_URL}/routines/${id}`, input);
      return response.data;
    } catch (error) {
      console.error('Error updating routine:', error.message);
      throw new Error(error.response?.data || 'Failed to update routine');
    }
  },
  deleteRoutine: async (_, { id }) => {
    try {
      await axios.delete(`${process.env.ROUTINES_URL}/routines/${id}`);
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