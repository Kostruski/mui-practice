const initialState = {
  musclesGroups: [],
  exercisesList: [],
  filteredExercises: [],
  selectedTab: 0,
  selectedExercise: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'setMusclesGroups':
      return { ...state, musclesGroups: action.musclesGroups };
    case 'addExercise':
      return {
        ...state,
        exercisesList: [...state.exercisesList, action.newExercise],
      };
    case 'setExercisesList':
      return { ...state, exercisesList: action.exercisesList };
    case 'deleteExercise':
      const exercisesAfterDelete = state.exercisesList.filter(el => el.id !== action.id);
      return { ...state, exercisesList: exercisesAfterDelete };
    case 'editExercise':
      const exercises = [...state.exercisesList]
      const { id } = action.exercise
      const selectedIndex = exercises.findIndex(el => el.id === id);
      const selected = exercises.filter(el => el.id === id);
      const editedExercise = { ...selected, ...action.exercise };
      exercises.splice(selectedIndex, 1, editedExercise);
      return { ...state, exercisesList: exercises}
    case 'setFilteredExercises':
      return { ...state, filteredExercises: action.filteredExercises };
    case 'setSelectedTab':
      return { ...state, selectedTab: action.selectedTab };
    case 'setSelectedExercise':
      return { ...state, selectedExercise: action.selectedExercise };
    default:
      return state;
  }
};
