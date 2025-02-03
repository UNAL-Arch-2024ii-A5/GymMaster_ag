// queries.js
const axios = require('axios');

const exerciseQueries = {
  allExercises: async () => {
    console.log("🔍 Starting allExercises resolver");
    try {
      const url = `http:localhost:3001/exercises`;
      console.log("🌐 Fetching exercises from:", url);
      
      const response = await axios.get(url);
      
      if (!response.data) {
        throw new Error('No data received from exercise service');
      }

      console.log("✅ Raw exercise data received:", {
        count: response.data?.length,
        firstItem: response.data?.[0]
      });

      const transformed = response.data.map(exercise => {
        // Ensure we're handling both possible ID fields
        const id = exercise.id || exercise._id;
        
        // Transform muscular_group to match GraphQL schema
        const muscularGroup = (exercise.muscular_group || []).map(mg => ({
          muscleID: mg.muscle_id.toString(), // Ensure ID is a string
          muscleName: mg.muscle_name
        }));

        const result = {
          id,
          exerciseName: exercise.exercise_name,
          muscularGroup
        };
        
        console.log("🔄 Transformed exercise:", {
          id: result.id,
          name: result.exerciseName,
          muscleCount: result.muscularGroup.length
        });
        
        return result;
      });

      // Add a guard clause to prevent returning null
      if (!transformed || transformed.length === 0) {
        return []; // Return empty array instead of null for non-nullable list
      }

      console.log(`🎉 Successfully transformed ${transformed.length} exercises`);
      return transformed;
    } catch (error) {
      console.error('Error fetching exercises:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Instead of throwing, return empty array to satisfy non-null requirement
      return [];
    }
  },
  getExercise: async (_, { id }) => {
    try {
      const response = await axios.get(`http:/localhost:3001/exercises/${id}`);
      const exercise = response.data;
      
      if (!exercise) {
        return null; // This field is nullable in schema
      }

      return {
        id: exercise._id || exercise.id,
        exerciseName: exercise.exercise_name,
        muscularGroup: (exercise.muscular_group || []).map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };
    } catch (error) {
      console.error('Error fetching exercise:', error);
      return null; // This field is nullable in schema
    }
  }
};

const routineQueries = {
  allRoutines: async () => {
    console.log("🔍 Starting allRoutines resolver");
    try {
      const url = `http:localhost:3001/routines`;
      console.log("🌐 Fetching routines from:", url);
      
      const response = await axios.get(url);
      
      if (!response.data) {
        console.warn("⚠️ No data received from routine service");
        return [];
      }

      console.log("✅ Raw routine data received:", {
        count: response.data?.length,
        firstItem: response.data?.[0]
      });

      
      const transformed = response.data.map(routine => {
        const result = {
          id: routine.id,
          routineName: routine.routine_name,
          routineDifficulty: routine.routine_difficulty,
          routineExercises: routine.routine_exercises || [],
          routineMuscles: (routine.routine_muscles || []).map(mg => ({
            muscleID: mg.muscle_id.toString(),
            muscleName: mg.muscle_name
          }))
        };

        console.log("🔄 Transformed routine:", {
          id: result.id,
          name: result.routineName,
          difficulty: result.routineDifficulty,
          exerciseCount: result.routineExercises.length,
          muscleCount: result.routineMuscles.length
        });

        return result;
      });

      console.log(`🎉 Successfully transformed ${transformed.length} routines`);
      return transformed;

    } catch (error) {
      console.error('Error fetching routines:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Return empty array to satisfy non-null requirement
      return [];
    }
  },

  getRoutine: async (_, { id }) => {
    console.log(`🔍 Starting getRoutine resolver for ID: ${id}`);
    try {
      const url = `http:localhost:3001/routines/${id}`;
      console.log("🌐 Fetching routine from:", url);

      const response = await axios.get(url);
      
      if (!response.data) {
        console.warn("⚠️ No data received for routine");
        return null;
      }
      
      const routine = response.data;
      const result = {
        id: id,
        routineName: routine.routine_name,
        routineDifficulty: routine.routine_difficulty,
        routineExercises: routine.routine_exercises || [],
        routineMuscles: (routine.routine_muscles || []).map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };

      console.log("✅ Successfully fetched and transformed routine:", {
        id: result.id,
        name: result.routineName
      });

      return result;

    } catch (error) {
      console.error('Error fetching routine:', {
        message: error.message,
        id: id,
        response: error.response?.data,
        status: error.response?.status
      });
      return null; // This field is nullable in schema
    }
  }
};

module.exports = {
  ...exerciseQueries,
  ...routineQueries
};