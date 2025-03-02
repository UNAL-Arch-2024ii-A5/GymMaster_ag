// queries.js
const axios = require('axios');
// AQUI ESTA LO QUE TOCA REEMPLAZAR ${process.env.ROUTINES_URL}
const exerciseQueries = {
  allExercises: async (_, { user }) => {
    if (!user) throw new Error("No autenticado");
    console.log("🔍 Starting allExercises resolver");
    try {
      const url = `${process.env.ROUTINES_URL}/exercises`;
      console.log("🌐 Fetching exercises from:", url);
      
      const response = await axios.get(url);
      
      if (!response.data) {
        throw new Error('No data received from exercise service');
      }

      console.log("✅ Raw exercise data received:", {
        count: response.data.length,
        firstItem: response.data[0]
      });

      const transformed = response.data.map(exercise => {
        // Use either "id" or "_id"
        const id = exercise.id || exercise._id;
        
        // Transform muscular_group array to match GraphQL schema
        const muscularGroup = (exercise.muscular_group || []).map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }));

        return {
          id,
          exerciseName: exercise.exercise_name,
          exerciseImage: exercise.exercise_image,
          exerciseTime: exercise.exercise_time,
          exerciseSets: exercise.exercise_sets,
          exerciseReps: exercise.exercise_reps,
          muscularGroup
        };
      });

      console.log(`🎉 Successfully transformed ${transformed.length} exercises`);
      return transformed;
    } catch (error) {
      console.error('Error fetching exercises:', error.message, error.response?.data);
      return [];
    }
  },

  getExercise: async (_, { id },{ user }) => {
    if (!user) throw new Error("No autenticado");
    try {
      const response = await axios.get(`${process.env.ROUTINES_URL}/exercises/${id}`);
      const exercise = response.data;
      
      if (!exercise) {
        return null;
      }

      return {
        id: exercise.id || exercise._id,
        exerciseName: exercise.exercise_name,
        exerciseImage: exercise.exercise_image,
        exerciseTime: exercise.exercise_time,
        exerciseSets: exercise.exercise_sets,
        exerciseReps: exercise.exercise_reps,
        muscularGroup: (exercise.muscular_group || []).map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      };
    } catch (error) {
      console.error('Error fetching exercise:', error.message);
      return null;
    }
  }
};

const routineQueries = {
  allRoutines: async (_, { user }) => {
    if (!user) throw new Error("No autenticado");
    console.log("🔍 Starting allRoutines resolver");
    try {
      const url = `${process.env.ROUTINES_URL}/routines`;
      console.log("🌐 Fetching routines from:", url);
      
      const response = await axios.get(url);
      
      if (!response.data) {
        console.warn("⚠️ No data received from routine service");
        return [];
      }

      console.log("✅ Raw routine data received:", {
        count: response.data.length,
        firstItem: response.data[0]
      });

      const transformed = response.data.map(routine => {
        // Transform detailed exercise info if available.
        const transformedExercises = (routine.exercises || []).map(ex => ({
          id: ex.id || ex._id,
          exerciseName: ex.exercise_name,
          exerciseImage: ex.exercise_image,
          exerciseTime: ex.exercise_time,
          exerciseSets: ex.exercise_sets,
          exerciseReps: ex.exercise_reps,
          muscularGroup: (ex.muscular_group || []).map(mg => ({
            muscleID: mg.muscle_id.toString(),
            muscleName: mg.muscle_name
          }))
        }));

        const transformedMuscles = (routine.routine_muscles || []).map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }));

        return {
          id: routine.id || routine._id,
          routineName: routine.routine_name,
          routineDifficulty: routine.routine_difficulty,
          routineExercises: routine.routine_exercises || [],
          routineMuscles: transformedMuscles,
          imageUrl: routine.image_url, // routine's image URL
          owner: routine.owner,
          exercises: transformedExercises
        };
      });

      console.log(`🎉 Successfully transformed ${transformed.length} routines`);
      return transformed;
    } catch (error) {
      console.error('Error fetching routines:', error.message, error.response?.data);
      return [];
    }
  },

  getRoutine: async (_, { id }, { user }) => {
    if (!user) throw new Error("No autenticado");
    console.log(`🔍 Starting getRoutine resolver for ID: ${id}`);
    try {
      const url = `${process.env.ROUTINES_URL}/${id}`;
      console.log("🌐 Fetching routine from:", url);

      const response = await axios.get(url);
      
      if (!response.data) {
        console.warn("⚠️ No data received for routine");
        return null;
      }
      
      const routine = response.data;
      const transformedExercises = (routine.exercises || []).map(ex => ({
        id: ex.id || ex._id,
        exerciseName: ex.exercise_name,
        exerciseImage: ex.exercise_image,
        exerciseTime: ex.exercise_time,
        exerciseSets: ex.exercise_sets,
        exerciseReps: ex.exercise_reps,
        muscularGroup: (ex.muscular_group || []).map(mg => ({
          muscleID: mg.muscle_id.toString(),
          muscleName: mg.muscle_name
        }))
      }));

      const transformedMuscles = (routine.routine_muscles || []).map(mg => ({
        muscleID: mg.muscle_id.toString(),
        muscleName: mg.muscle_name
      }));
      
      const result = {
        id: routine.id || routine._id,
        routineName: routine.routine_name,
        routineDifficulty: routine.routine_difficulty,
        routineExercises: routine.routine_exercises || [],
        routineMuscles: transformedMuscles,
        imageUrl: routine.image_url,
        owner: routine.owner,
        exercises: transformedExercises
      };

      console.log("✅ Successfully fetched and transformed routine:", {
        id: result.id,
        name: result.routineName
      });

      return result;
    } catch (error) {
      console.error('Error fetching routine:', error.message, error.response?.data);
      return null;
    }
  }
};

module.exports = {
  ...exerciseQueries,
  ...routineQueries
};
