import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import rootReducer from '../../reducer';

export const renderComponent = (Component, props = {}) => {
  const store = createStore(rootReducer);

  return render(
    <Provider store={store}>
      <Component {...props} />
    </Provider>,
  );
};
