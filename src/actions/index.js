export const setExercisesList = (exercises, muscles) => {
  const musclesGroups = ['all', ...muscles];
  return dispatch => {
    dispatch({ type: 'setExercisesList', exercisesList: exercises });
    dispatch({ type: 'setMusclesGroups', musclesGroups });
  };
};

export const onTabSelect = (selectedMusclesGroup, exercisesList) => {
  return dispatch => {
    const exercisesByMuscleGroup = exercisesList.filter(exercise => {
      return exercise.muscles === selectedMusclesGroup;
    });
    selectedMusclesGroup === 'all'
      ? dispatch({
          type: 'setFilteredExercises',
          filteredExercises: exercisesList,
        })
      : dispatch({
          type: 'setFilteredExercises',
          filteredExercises: exercisesByMuscleGroup,
        });
  };
};

export const addExercise = newExercise => {
  return dispatch => {
    newExercise.id = newExercise.title
      .trim()
      .toLocaleLowerCase()
      .replace(/\s+/g, '-');

    dispatch({ type: 'addExercise', newExercise });
  };
};

export const deleteExercise = id => {
  return dispatch =>
    dispatch({
      type: 'deleteExercise',
      id,
    });
};

export const editExercise = exercise => {
  return dispatch => dispatch({ type: 'editExercise', exercise });
};

export const setSelectedExercise = id => {
  return dispatch =>
    dispatch({ type: 'setSelectedExercise', selectedExercise: id });
};

export const openForm = exercise => {
  return dispatch =>
    dispatch({
      type: 'setFormOpen',
      formOpen: true,
      exerciseToEdit: exercise,
    });
};

export const closeForm = () => {
  return dispatch =>
    dispatch({
      type: 'setFormOpen',
      formOpen: false,
      exerciseToEdit: undefined,
    });
};

export const openAlert = id => {
  return dispatch =>
    dispatch({
      type: 'setAlertOpen',
      alertOpen: true,
      idToBeDeleted: id,
    });
};

export const closeAlert = () => {
  return dispatch =>
    dispatch({
      type: 'setAlertOpen',
      alertOpen: false,
      idToBeDeleted: null,
    });
};
