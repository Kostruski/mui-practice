import React from 'react';
import Alert from '../Alert';
import { render, fireEvent } from '@testing-library/react';

describe('Alert dialog box', () => {
  const mockDelete = jest.fn();
  const mockCancel = jest.fn();
  
  const getNodeByText = (text, node = 'div') => {
      const props = {
        open: true,
        deleteExercise: mockDelete,
        closeAlert: mockCancel,
      };
    const { getByText } = render(
      <Alert {...props} />,
    );
    return getByText(text).closest(node);
  };

  test('it renders a dialog box', () => {
    expect(
      getNodeByText('Are you sure. This exercise will be deleted'),
    ).toBeInTheDocument();
  });

  test('it should not render a dialog box', () => {
    const { container } = render(<Alert open={false} />);
    expect(container).toBeEmpty();
  });

  test('cancel button should emit callback', () => {
    fireEvent.click(getNodeByText('Cancel', 'button'));
    expect(mockCancel.mock.calls.length).toBe(1)
  });

  test('delete button should emit callback', () => {
    fireEvent.click(getNodeByText('Delete', 'button'));
     expect(mockDelete.mock.calls.length).toBe(1);
  })
});
