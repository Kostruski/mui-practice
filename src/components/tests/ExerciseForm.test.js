import React from 'react';
import ExerciseForm from '../ExerciseForm';
import {renderComponent} from './utils'

describe('Exercise form', () => {
  const mockCloseForm = jest.fn();
  const mockConfirmButtonAction = jest.fn();
  const formInitialState = {
    id: '',
    title: '',
    description: '',
    muscles: '',
  };
  const texts = {
    title: 'Edit exercise',
    content: 'Change fields content to change exercise',
    confirmButton: 'Change',
  };
  const props = {
    initialState: formInitialState,
    open: true,
    closeForm: mockCloseForm,
    texts,
    confirmButtonAction: mockConfirmButtonAction,
    isEditing: false,
  };

  const { queryByRole } = renderComponent(ExerciseForm, props);

  test('should open in dialog when adding new exercise', () => {
    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  test('should not open in dialog when editing', () => {
    const { queryByRole } = renderComponent(ExerciseForm, {...props, isEditing: true})
  
    expect(queryByRole('dialog')).not.toBeTruthy();
  });

  // test('sholud render all the form fields', () => {

  // })
});
