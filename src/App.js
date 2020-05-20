import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { muscles, exercises } from './store';
import { setExercisesList, onTabSelect } from './actions';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#5D1360' },
    secondary: { main: '#D0A60A' },
    text: { primary: '#1D1717' },
    padding: '1rem',
  },
});

function App() {
  const dispatch = useDispatch();

  console.log('app renders ...');

  const {
    exercisesList,
    filteredExercises,
    selectedTab,
    musclesGroups,
    selectedExercise,
  } = useSelector(state => state.exercises);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    dispatch({ type: 'setIsMobile', isMobile });
  }, [isMobile]);

  const getExerciseByMusclesGroup = () => {
    return Object.entries(
      filteredExercises.reduce((accumulatedExercises, currentExercise) => {
        const { muscles } = currentExercise;
        accumulatedExercises[muscles] = accumulatedExercises[muscles]
          ? [...accumulatedExercises[muscles], currentExercise]
          : [currentExercise];
        return accumulatedExercises;
      }, {}),
    );
  };

  useEffect(() => {
    const selectedMusclesGroup = musclesGroups[selectedTab];
    dispatch(onTabSelect(selectedMusclesGroup, exercisesList));
  }, [exercisesList, selectedTab]);

  useEffect(() => {
    dispatch(setExercisesList(exercises, muscles));
  }, [dispatch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth={'xl'}>
          <Header />
          <Main
            sortedExercises={getExerciseByMusclesGroup()}
            exercises={filteredExercises}
          />
          <Footer
            selectedExercise={selectedExercise}
            selectedTab={selectedTab}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

