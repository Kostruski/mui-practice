const initialState = {
  alertOpen: false,
  formOpen: false,
  idToBeDeleted: null,
  exerciseToEdit: null,
  isMobile: false,
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
    case 'setIsMobile': 
      return {
        ...state,
        isMobile: action.isMobile
      }
    default:
      return state;
  }
};
