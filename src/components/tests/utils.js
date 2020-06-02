import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import rootReducer from '../../reducer';

const initialState = {
  dialogs:  {
  alertOpen: false,
  formOpen: false,
  idToBeDeleted: null,
  exerciseToEdit: null,
  isMobile: false,
  },
  exercises: {
  musclesGroups: ['all','shoulders', 'chest', 'arms', 'back', 'legs'],
  exercisesList: [],
  filteredExercises: [],
  selectedTab: 0,
  selectedExercise: null,
}
}

const testStore = createStore(rootReducer, initialState);

export const renderComponent = (Component, props = {}) => {  
  return render(
    <Provider store={testStore}>
      <Component {...props} />
    </Provider>,
  );
};

