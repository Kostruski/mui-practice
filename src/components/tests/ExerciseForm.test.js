import ExerciseForm from '../ExerciseForm';
import { fireEvent, prettyDOM } from '@testing-library/react';
import { renderComponent } from './utils';
import { muscles } from '../../store';

describe('Exercise form', () => {
  const mockCloseForm = jest.fn();
  const mockConfirmButtonAction = jest.fn();
  const formInitialState = {
    id: '',
    title: '',
    description: '',
    muscles: '',
  };
  const formTexts = {
    id: '',
    title: 'test',
    description: 'test',
    muscles: 'all',
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
  const musclesGroups = ['all', ...muscles];

  test('should open in dialog when adding new exercise', () => {
    const { queryByRole } = renderComponent(ExerciseForm, props);

    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  test('should not open in dialog when editing', () => {
    const { queryByRole } = renderComponent(ExerciseForm, {
      ...props,
      isEditing: true,
    });

    expect(queryByRole('dialog')).not.toBeTruthy();
  });

  test('should render all the form fields', () => {
    const { queryByLabelText } = renderComponent(ExerciseForm, props);

    const title = queryByLabelText('title');
    const description = queryByLabelText('description');
    const radios = musclesGroups.map(el => queryByLabelText(el));
    expect(
      title && description && radios.every(el => el !== null),
    ).toBeTruthy();
  });

  test('close button should emit event', () => {
    const { queryByText } = renderComponent(ExerciseForm, props);

    fireEvent.click(queryByText('Cancel').closest('button'));

    expect(mockCloseForm.mock.calls.length).toBe(1);
  });

  test('submit button should be disabled when any of the fields is empty', () => {
    const { queryByText } = renderComponent(ExerciseForm, props);
    const button = queryByText('Change').closest('button');

    expect(button.disabled).toBeTruthy();
  });

  test('submit button should be enabled when all of the fields are filled', () => {
    const { queryByText } = renderComponent(ExerciseForm, {
      ...props,
      initialState: formTexts,
    });
    const button = queryByText('Change').closest('button');

    expect(button.disabled).not.toBeTruthy();
  });

  test('expect Change button to emit event', () => {
    const { queryByText } = renderComponent(ExerciseForm, {
      ...props,
      initialState: formTexts,
    });
    const button = queryByText('Change').closest('button');

    fireEvent.click(button);

    expect(mockConfirmButtonAction.mock.calls.length).toBe(1);
  });
});
