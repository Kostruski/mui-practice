import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Right from './Right';
import Left from './Left';

const styles = theme => ({
  paper: {
    padding: '1rem',
    margin: '10px 0',
  },
});

const Main = ({ classes }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Right styles={classes.paper} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Left styles={classes.paper} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Main);
