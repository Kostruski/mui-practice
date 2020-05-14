import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { muscles } from '../store';

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

export const ExerciseForm = ({ classes, initialState = formInitialState, open, closeForm, texts, confirmButtonAction }) => {
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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{texts.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {texts.content}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            type="text"
            fullWidth
            value={newExercise.title}
            onChange={e => inputController(e.target.id)}
          />
          <TextField
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            multiline
            value={newExercise.description}
            onChange={e => inputController(e.target.id)}
          />
          <RadioGroup classes={{ root: classes.formGroup }}>
            {muscles.map(el => (
              <FormControlLabel
                control={
                  <Radio onChange={e => radioController(e.target.value)} checked={el === newExercise.muscles}/>
                }
                label={el}
                value={el}
                key={el}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={formEmpty}>
            {texts.confirmButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(ExerciseForm);
