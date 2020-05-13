import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { muscles, exercises } from './store';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#5D1360' },
    secondary: { main: '#D0A60A' },
    text: { primary: '#1D1717' },
    padding: '1rem',
  },
});

function App() {
  const selectedExerciseIdInitialState = null;
  const [exercisesList, setExercisesList] = useState(exercises);
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    selectedExerciseIdInitialState,
  );

  const addExercise = newExercise => {
    const id = newExercise.title
      .trim()
      .toLocaleLowerCase()
      .replace(/\s+/g, '-');
    newExercise.id = id;
  
    exercises.push(newExercise);
    const updatedExercises = [...exercises];
    setExercisesList(updatedExercises);
  };

  // const editExercise = exercise => {
  //   const selectedIndex = exercises.findIndex(el => el.id === exercise.id);
  //   exercises.splice(selectedIndex, 1, exercise);
  //   const updatedExercises = [...exercises];
  //   setExercisesList(updatedExercises);
  // };

  const editExercise = exercise => {
    const selected = exercises.find(el => el.id === exercise.id);
    const updatedExercises = [...exercises, { ...selected, ...exercise }];
    setExercisesList(updatedExercises);
  };

  const deleteExercise = id => {
    const exerciseIndex = exercises.findIndex(el => el.id === id);
    exercises.splice(exerciseIndex, 1);
    const updatedExercises = [...exercises];
    setSelectedExerciseId(null);
    setExercisesList(updatedExercises);
  };

  const getExerciseByMusclesGroup = () => {
    return Object.entries(
      exercisesList.reduce((accumulatedExercises, currentExercise) => {
        const { muscles } = currentExercise;
        accumulatedExercises[muscles] = accumulatedExercises[muscles]
          ? [...accumulatedExercises[muscles], currentExercise]
          : [currentExercise];

        return accumulatedExercises;
      }, {}),
    );
  };

  const onSelect = (musclesGroup = 'all') => {
    const selectedExerciseIds = exercises.filter(exercise => {
      return exercise.muscles === musclesGroup;
    });
    if (selectedExerciseIds.length === 0 || musclesGroup === 'all')
      return setExercisesList(exercises);
    return setExercisesList(selectedExerciseIds);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth={'xl'}>
          <Header exercisesList={exercisesList} addExercise={addExercise} />
          <Main
            sortedExercises={getExerciseByMusclesGroup()}
            exercises={exercisesList}
            selectedExerciseId={selectedExerciseId}
            setSelectedExerciseId={setSelectedExerciseId}
            deleteExercise={deleteExercise}
            editExercise={editExercise}
          />
          <Footer
            muscles={muscles}
            onSelect={onSelect}
            setSelectedExerciseId={setSelectedExerciseId}
            selectedExerciseId={selectedExerciseId}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

// ways to style components :

// function App() {
//     const useStyles = makeStyles({
//         root: {
//             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//             height: '100vh',
//         },
//     });
//     return (
//         <div className="App">
//             <Box component="div" className={useStyles().root} />
//         </div>
//     );
// }

// function App() {
//     const MyBox = styled(Box)({
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//         height: '100vh',
//     });
//     return (
//         <div className="App">
//             <MyBox />
//         </div>
//     );
// }
