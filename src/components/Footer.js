import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  indicator: {
    height: '2px',
  },
  tabRoot: {
    fontWeight: theme.typography.fontWeightLight,
  },
  selectedTab: {
    fontWeight: theme.typography.fontWeightMedium,
  },
});

const Footer = ({ classes, muscles, onTabSelect, setSelectedExerciseId, selectedTab, setSelectedTab }) => {
  const handleChange = (event, newValue) => {
    setSelectedExerciseId(null);
    setSelectedTab(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        fullWidth
        classes={{
          indicator: classes.indicator,
          root: classes.root,
        }}
      >
        <Tab
          label="all"
          classes={{ root: classes.tabRoot, selected: classes.selectedTab }}
        />
        {muscles.map(group => (
          <Tab
            key={group}
            label={group}
            classes={{ root: classes.tabRoot, selected: classes.selectedTab }}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(Footer);
