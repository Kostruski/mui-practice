import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextFields from './TextFields';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
  formGroup: {
    flexDirection: 'row',
  },
});

const formInitialState = {
  id: '',
  title: '',
  description: '',
  muscles: '',
};

export const ExerciseForm = props => {
  const {
    classes,
    initialState = formInitialState,
    open,
    closeForm,
    texts,
    confirmButtonAction,
    isEditing,
  } = props;
  const [newExercise, setNewExercise] = useState(initialState);
  const [formEmpty, setFormEmpty] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      const { title, description, muscles } = newExercise;

      if (!!title.trim() && !!description.trim() && !!muscles.trim()) {
        setFormEmpty(false);
      } else {
        setFormEmpty(true);
      }
    };
    validateForm();
  });

  useEffect(() => {
    setNewExercise(initialState);
  }, [initialState]);

  const handleClose = () => {
    closeForm();
    setNewExercise(initialState);
  };

  const inputController = inputId => {
    const value = document.getElementById(inputId).value;
    setNewExercise({ ...newExercise, [inputId]: value });
  };

  const radioController = value => {
    setNewExercise({ ...newExercise, muscles: value });
  };

  const handleSubmit = () => {
    if (!formEmpty) {
      confirmButtonAction(newExercise);
      handleClose();
    }
  };

  const hocProps = {
    texts,
    inputController,
    radioController,
    classes,
    newExercise,
    handleClose,
    handleSubmit,
    formEmpty,
  };

  return isEditing ? (
    <>
      <TextFields {...hocProps} />
    </>
  ) : (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <TextFields {...hocProps} />
      </Dialog>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(ExerciseForm);

ExerciseForm.propTypes = {
  initialState: PropTypes.objectOf(PropTypes.string),
  open: PropTypes.bool,
  closeForm: PropTypes.func,
  texts: PropTypes.objectOf(PropTypes.string),
  confirmButtonAction: PropTypes.func,
  isEditing: PropTypes.bool
};
