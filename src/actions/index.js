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
  return (dispatch, getState) => {
    const { exerciseToEdit } = getState().dialogs;
    const { exercisesList } = getState().exercises;

    const exercisesAfterDelete = exercisesList.filter(el => el.id !== id)

    dispatch({
      type: 'setExercisesList',
      exercisesList: exercisesAfterDelete
    });

    if (exerciseToEdit && exerciseToEdit.id === id)
      dispatch({ type: 'setExerciseToEdit', exerciseToEdit: null });
  };
};

export const editExercise = exercise => {
  return (dispatch, getState) => {
    const exercises = getState().exercises.exercisesList;
    const exercisesList = [...exercises]
    const { id } = exercise;
    const selectedIndex = exercisesList.findIndex(el => el.id === id);
    const selected = exercisesList.find(el => el.id === id);
    const editedExercise = {
      ...selected,
      ...exercise,
    };
    exercisesList.splice(selectedIndex, 1, editedExercise);
    console.log(exercisesList, 'z edit exercise')
    
    dispatch({
      type: 'setExercisesList',
      exercisesList
    });
  };
};

export const setSelectedExercise = id => {
  return dispatch =>
    dispatch({ type: 'setSelectedExercise', selectedExercise: id });
};

export const openForm = exercise => {
  return dispatch => {
    dispatch({
      type: 'setFormOpen',
      formOpen: true,
      exerciseToEdit: exercise,
    });
    dispatch({
      type: 'setSelectedExercise',
      selectedExercise: null,
    });
  };
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
