import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExerciseForm from './ExerciseForm';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { addExercise } from '../actions';

const Header = () => {
  const [formOpen, setFormOpen] = useState(false);

  const dispatch = useDispatch();

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const isMobileWidth = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant={'subtitle1'} noWrap color="secondary">
            Exercise database
          </Typography>
          <ExerciseForm
            confirmButtonAction={exercise => dispatch(addExercise(exercise))}
            closeForm={closeForm}
            open={formOpen}
            texts={{
              title: 'Add exercise',
              content: 'Fill input fields to add exercise',
              confirmButton: 'Add',
            }}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => openForm()}
          >
            {isMobileWidth ? '+' : 'Add exercise'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
