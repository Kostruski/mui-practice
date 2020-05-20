import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { setSelectedExercise } from '../actions';

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

const Footer = ({ classes }) => {
  const dispatch = useDispatch();

  const { selectedTab, musclesGroups, selectedExercise } = useSelector(
    state => state.exercises,
  );

  const {isMobile} = useSelector(state => state.dialogs)

  const handleChange = (event, newValue) => {
    if (newValue !== selectedTab)
      dispatch({ type: 'setSelectedTab', selectedTab: newValue });
  };

  useEffect(() => {
    if (
      selectedExercise &&
      selectedExercise.muscles !== musclesGroups[selectedTab] && selectedTab !== 0
    ) {
      dispatch(setSelectedExercise(null));
    };
  }, [selectedTab]);

  
  return (
    <Paper square>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="on"
        centered
        variant={isMobile ? 'scrollable' : 'auto'}
        classes={{
          indicator: classes.indicator,
          root: classes.root,
        }}
      >
        {musclesGroups.map(group => (
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
