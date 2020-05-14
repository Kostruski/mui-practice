export default (state, action) => {
  switch (action.type) {
    case 'setAlertOpen':
      return {
        ...state,
        alertOpen: action.payload.alertOpen,
        idToBeDeleted: action.payload.idToBeDeleted,
      };
    case 'setFormOpen':
      return {
        ...state,
        formOpen: action.payload.formOpen,
        exerciseToEdit: action.payload.exerciseToEdit,
      };
    default:
      return state;
  }
};

