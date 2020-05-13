import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExerciseForm from './ExerciseForm';
import Button from '@material-ui/core/Button';

const Header = ({ exercisesList, addExercise }) => {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant={'subtitle1'} noWrap color="secondary">
            Exercise database
          </Typography>
          <ExerciseForm
            exercises={exercisesList}
            confirmButtonAction={addExercise}
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
            Add exercise
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
