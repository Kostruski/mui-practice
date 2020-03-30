import React from 'react';
import { Paper, Tabs, Tab, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  centered: {
    justifyContent: 'space-evenly',
  },
  indicator: {
    height: '4px',
  },
  selectedTab: {
    fontWeight: theme.typography.fontWeightLight,
  },
});

const Footer = ({ classes }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    console.log(event.currentTarget, newValue);
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        fullWidth
        classes={{ centered: classes.centered, indicator: classes.indicator }}
      >
        <Tab label="Item One" classes={{ selected: classes.selectedTab }} />
        <Tab label="Item Two" classes={{ selected: classes.selectedTab }} />
        <Tab label="Item Three" classes={{ selected: classes.selectedTab }} />
      </Tabs>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(Footer);
