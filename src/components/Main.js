import React from 'react';
import { Paper, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';

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

const Main = ({ classes, exercises }) => {
  console.log(exercises);

  const [exerciseDetails, setExerciseDetails] = useState({title: 'Welcome', description: 'Select an exercise'})
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} classes={{ root: classes.gridItem }}>
        <Paper classes={{ root: classes.paper }}>
          {exercises.map(el => (
            <>
              <Typography
                variant="h5"
                align="left"
                classes={{ root: classes.heading }}
              >
                {el[0]}
              </Typography>

              <List component="ul">
                {el[1].map(({ title, description }) => (
                  <ListItem
                    button
                    onClick={() => setExerciseDetails({ title, description })}
                  >
                    <ListItemText primary={title} />
                  </ListItem>
                ))}
              </List>
            </>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} classes={{ root: classes.gridItem }}>
        <Paper classes={{ root: classes.paper }}>
          <Typography variant="subtitle2">{exerciseDetails.title}</Typography>
          <Typography variant="caption">
            {exerciseDetails.description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Main);
