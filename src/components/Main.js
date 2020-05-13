import React, { Fragment, useState } from 'react';
import Alert from './Alert';
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import ExerciseForm from './ExerciseForm';

const styles = theme => ({
  gridItem: {
    padding: '1rem',
    margin: '10px 0',
  },
  paper: {
    padding: '1rem',
    height: '400px',
    overflowY: 'scroll',
  },
  heading: {
    textTransform: 'capitalize',
    margin: '5px 0',
  },
});

const Main = ({
  classes,
  exercises,
  sortedExercises,
  selectedExerciseId,
  setSelectedExerciseId,
  deleteExercise,
  editExercise,
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(undefined);

  const openForm = exercise => {
    setFormOpen(true);
    setExerciseToEdit(exercise);
  };

  const closeForm = () => {
    setFormOpen(false);
    setExerciseToEdit(undefined);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const openAlert = id => {
    setAlertOpen(true);
    setIdToBeDeleted(id);
  };

  const getExerciseDetails = () => {
    return exercises.find(el => el.id === selectedExerciseId);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} classes={{ root: classes.gridItem }}>
          <Paper classes={{ root: classes.paper }}>
            {sortedExercises.map((el, i) => (
              <Fragment key={el[0] + i}>
                <Typography
                  variant="h5"
                  align="left"
                  classes={{ root: classes.heading }}
                >
                  {el[0]}
                </Typography>
                <List component="ul">
                  {el[1].map((el, i) => (
                    <ListItem
                      button
                      onClick={() => {
                        setSelectedExerciseId(el.id);
                      }}
                      selected={selectedExerciseId === el.id}
                      key={el.description + i}
                    >
                      <ListItemText primary={el.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            openAlert(el.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => {
                            openForm(el);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} classes={{ root: classes.gridItem }}>
          <Paper classes={{ root: classes.paper }}>
            <Typography
              variant="h5"
              align="left"
              classes={{ root: classes.heading }}
            >
              {selectedExerciseId ? getExerciseDetails().title : 'Welcome'}
            </Typography>
            <Typography variant="caption" align="left" display="block">
              {selectedExerciseId
                ? getExerciseDetails().description
                : 'Please select an exercise'}
            </Typography>
          </Paper>
        </Grid>
        <ExerciseForm
          initialState={exerciseToEdit}
          open={formOpen}
          closeForm={closeForm}
          texts={{
            title: 'Edit exercise',
            content: 'Change fields content to change exercise',
            confirmButton: 'Change',
          }}
          confirmButtonAction={editExercise}
        />
        <Alert
          open={alertOpen}
          closeAlert={closeAlert}
          deleteExercise={() => deleteExercise(idToBeDeleted)}
        />
      </Grid>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Main);
