import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = {};

const Alert = ({ open, closeAlert, deleteExercise }) => {
  
  const handleDelete = () => {
    deleteExercise();
    closeAlert();
  };

  return (
    <Dialog
      open={open}
      onClose={closeAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure. This exercise will be deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAlert} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(Alert);

Alert.propTypes = {
  open: PropTypes.bool,
  closeAlert: PropTypes.func,
  deleteExercise: PropTypes.func,
};


