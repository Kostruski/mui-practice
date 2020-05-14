import React, { Fragment, useReducer } from 'react';
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
    overflowY: 'auto',
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

  const initialState = {
    alertOpen: false,
    idToBeDeleted: '',
    formOpen: false,
    exerciseToEdit: undefined,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setAlertOpen':
        return {
          ...state,
          alertOpen: action.payload.alertOpen,
          idToBeDeleted: action.payload.idToBeDeleted,
        };
      case 'setFormOpen':
        return {
          ...state,
          formOpen: action.payload.formOpen,
          exerciseToEdit: action.payload.exerciseToEdit,
        };
      default:
        return state;
    }
  };

  const [
    { formOpen, alertOpen, idToBeDeleted, exerciseToEdit },
    dispatch,
  ] = useReducer(reducer, initialState);

  const openForm = exercise => {
    dispatch({
      type: 'setFormOpen',
      payload: { formOpen: true, exerciseToEdit: exercise },
    });
  };

  const closeForm = () => {
    dispatch({
      type: 'setFormOpen',
      payload: { formOpen: false, exerciseToEdit: undefined },
    });
  };

  const openAlert = id => {
    dispatch({
      type: 'setAlertOpen',
      payload: { alertOpen: true, idToBeDeleted: id },
    });
  };

  const closeAlert = () => {
    dispatch({
      type: 'setAlertOpen',
      payload: { alertOpen: false, idToBeDeleted: '' },
    });
  };

  const getExerciseDetails = () => {
    return exercises.find(el => el.id === selectedExerciseId);
  };

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
              {selectedExerciseId ? getExerciseDetails().title : 'Welcome'}
            </Typography>
            <Typography variant="caption" align="left" display="block">
              {selectedExerciseId
                ? getExerciseDetails().description
                : 'Please select an exercise'}
            </Typography>
          </Paper>
        </Grid>
        {exerciseToEdit && (
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
        )}
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
