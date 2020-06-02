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
