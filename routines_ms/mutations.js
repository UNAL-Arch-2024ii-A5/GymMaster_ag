const axios = require('axios');

const exerciseMutations = {
  createExercise: async (_, { exerciseName, muscularGroup }, userData) => {
    if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
    const payload = {
      exercise_name: exerciseName,
      muscular_group: muscularGroup.map(mg => ({
        muscle_id: parseInt(mg.muscleID),
        muscle_name: mg.muscleName
      }))
    };

    try {
      const response = await axios.post(`${process.env.ROUTINES_URL}/exercises`, payload);
      const idMatch = response.data.match(/ID: &{ObjectID\("(.+)"\)}/);
      const extractedId = idMatch ? idMatch[1] : null;

      // Return a manually constructed exercise object
      return {
        id: extractedId,
        exerciseName: payload.exercise_name,
        muscularGroup: payload.muscular_group.map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };
    } catch (error) {
      console.error('❌ Error Details:', {
        message: error.message,
        fullError: error
      });
      throw error;
    }
  },
  
  updateExercise: async (_, { id, exerciseName, muscularGroup }, userData) => {
    if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
    const payload = {
      id: id,
      exercise_name: exerciseName,
      muscular_group: muscularGroup.map(mg => ({
        muscle_id: parseInt(mg.muscleID),
        muscle_name: mg.muscleName
      }))
    };

    try {
      const response = await axios.put(`${process.env.ROUTINES_URL}/exercises/${id}`, payload);
      
      // Return a manually constructed exercise object
      return {
        id: id,
        exerciseName: payload.exercise_name,
        muscularGroup: payload.muscular_group.map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };
    } catch (error) {
      console.error('❌ Error Details:', {
        message: error.message,
        fullError: error
      });
      throw error;
    }
  },
  
  deleteExercise: async (_, { id }, userData) => {
    if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
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
  createRoutine: async (_, { routineName, routineDifficulty, routineExercises, customerId }, userData) => {
    if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
    const payload = {
      routine_name: routineName,
      routine_difficulty: routineDifficulty,
      routine_exercises: routineExercises,
      customer_id: customerId  // Include customer IDs in the payload
    };

    try {
      const response = await axios.post(`${process.env.ROUTINES_URL}/routines`, payload);
      
      // Flexible ID extraction
      const insertedId = response.data.InsertedID || 
                         (typeof response.data === 'string' ? 
                          response.data.match(/ID: &{ObjectID\("(.+)"\)}/)?.[1] : 
                          null);

      return {
        id: insertedId,
        routineName: payload.routine_name,
        routineDifficulty: payload.routine_difficulty,
        routineExercises: payload.routine_exercises,
        routineMuscles: [],
        customerId: customerId  // Return customer IDs in the result
      };
    } catch (error) {
      console.error('❌ Error Details:', {
        message: error.message,
        fullError: error
      });
      throw error;
    }
  },

  updateRoutine: async (_, { id, routineName, routineDifficulty, routineExercises, customerId }, userData) => {
    if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
    const payload = {
      routine_name: routineName,
      routine_difficulty: routineDifficulty,
      routine_exercises: routineExercises,
      customer_id: customerId  // Include customer IDs in the payload
    };

    try {
      const response = await axios.put(`${process.env.ROUTINES_URL}/routines/${id}`, payload);
      
      return {
        id: id,
        routineName: payload.routine_name,
        routineDifficulty: payload.routine_difficulty,
        routineExercises: payload.routine_exercises,
        routineMuscles: [], // If your backend doesn't return routine muscles
        customerId: customerId  // Return customer IDs in the result
      };
    } catch (error) {
      console.error('❌ Error Details:', {
        message: error.message,
        fullError: error
      });
      throw error;
    }
  },
  
  deleteRoutine: async (_, { id }, userData) => {
    if (userData.role !== "admin" && userData.role !== "coach") throw new Error("No tienes permisos");
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
