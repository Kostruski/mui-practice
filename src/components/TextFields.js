import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  formGroup: {
    flexDirection: 'row',
  },
});

const TextFields = ({
  texts,
  inputController,
  radioController,
  classes,
  newExercise,
  handleClose,
  handleSubmit,
  formEmpty,
}) => {
  const { musclesGroups } = useSelector(state => state.exercises);
  
  return (
    <>
      <DialogTitle id="form-dialog-title">{texts.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{texts.content}</DialogContentText>
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
          {musclesGroups.map(el => (
            <FormControlLabel
              control={
                <Radio
                  onChange={e => radioController(e.target.value)}
                  checked={el === newExercise.muscles}
                />
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
    </>
  );
};

export default withStyles(styles, { withTheme: true })(TextFields);

