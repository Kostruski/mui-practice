import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from './Alert';
import ExerciseForm from './ExerciseForm';
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
import { withStyles } from '@material-ui/styles';

import {
  setSelectedExercise,
  openForm,
  closeForm,
  openAlert,
  closeAlert,
  deleteExercise,
  editExercise
} from '../actions';

const styles = theme => ({
  gridItem: {
    padding: '1rem',
    margin: '10px 0',
  },
  paper: {
    padding: '1rem',
    height: '400px',
    overflowY: 'auto',
  },
  heading: {
    textTransform: 'uppercase',
    margin: '5px 0',
  },
});

const Main = ({
  classes,
  exercises,
  sortedExercises,
}) => {
  const { selectedExercise } = useSelector(state => state.exercises);

  const { formOpen, alertOpen, idToBeDeleted, exerciseToEdit } = useSelector(
    state => state.dialogs,
  );

  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} classes={{ root: classes.gridItem }}>
          <Paper classes={{ root: classes.paper }}>
            {!exercises.length ? (
              <Typography
                variant="h5"
                align="left"
                classes={{ root: classes.heading }}
              >
                No exercise for selected muscles group
              </Typography>
            ) : (
              sortedExercises.map((el, i) => (
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
                          dispatch(setSelectedExercise(el));
                        }}
                        selected={selectedExercise && (selectedExercise.id === el.id)}
                        key={el.description + i}
                      >
                        <ListItemText primary={el.title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              dispatch(openAlert(el.id));
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => {
                              dispatch(openForm(el));
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Fragment>
              ))
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} classes={{ root: classes.gridItem }}>
          <Paper classes={{ root: classes.paper }}>
            <Typography
              variant="h5"
              align="left"
              classes={{ root: classes.heading }}
            >
              {selectedExercise ? selectedExercise.title : 'Welcome'}
            </Typography>
            <Typography variant="caption" align="left" display="block">
              {selectedExercise
                ? selectedExercise.description
                : 'Please select an exercise'}
            </Typography>
          </Paper>
        </Grid>
        {exerciseToEdit && (
          <ExerciseForm
            initialState={exerciseToEdit}
            open={formOpen}
            closeForm={() =>dispatch(closeForm())}
            texts={{
              title: 'Edit exercise',
              content: 'Change fields content to change exercise',
              confirmButton: 'Change',
            }}
            confirmButtonAction={(exercise) => dispatch(editExercise(exercise))}
          />
        )}
        <Alert
          open={alertOpen}
          closeAlert={() => dispatch(closeAlert())}
          deleteExercise={() => dispatch(deleteExercise(idToBeDeleted))}
        />
      </Grid>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Main);
