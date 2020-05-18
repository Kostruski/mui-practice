const initialState = {
  alertOpen: false,
  formOpen: false,
  idToBeDeleted: null,
  exerciseToEdit: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'setAlertOpen':
      return {
        ...state,
        alertOpen: action.alertOpen,
        idToBeDeleted: action.idToBeDeleted,
      };
    case 'setFormOpen':
      return {
        ...state,
        formOpen: action.formOpen,
        exerciseToEdit: action.exerciseToEdit,
      };
    default:
      return state;
  }
};
