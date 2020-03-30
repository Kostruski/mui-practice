import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Error = ({open}) => {
    return (
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Oooops ...."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is not working
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
}

export default Error

