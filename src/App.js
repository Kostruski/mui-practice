import React, { useState, useEffect } from 'react';
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

  const [exercisesList, setExercisesList] = useState(exercises);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    null
  );
  const [filteredExercises, setFilteredExercises] = useState([]);
  let musclesGroup;
  
  const addExercise = newExercise => {
    const id = newExercise.title
      .trim()
      .toLocaleLowerCase()
      .replace(/\s+/g, '-');
    newExercise.id = id;

    const updatedExercises = [...exercisesList];

    updatedExercises.push(newExercise);

    setExercisesList(updatedExercises);
  };

  const editExercise = exercise => {
    const selected = exercisesList.find(el => el.id === exercise.id);
    const updatedExercises = [...exercisesList, { ...selected, ...exercise }];
    setExercisesList(updatedExercises);
  };

  const deleteExercise = id => {
    const updatedExercises = [...exercisesList];
    const exerciseIndex = updatedExercises.findIndex(el => el.id === id);
    updatedExercises.splice(exerciseIndex, 1);
    
    setSelectedExerciseId(null);

   setExercisesList(updatedExercises)

  };

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

  const onTabSelect = (musclesGroup) => {
    const updatedExercises = [...exercisesList];
    const exercisesByMuscleGroup = updatedExercises.filter(exercise => {
      return exercise.muscles === musclesGroup;
    });
    (musclesGroup === 'all') ? setFilteredExercises(updatedExercises) : setFilteredExercises(exercisesByMuscleGroup);
  };

    useEffect(() => {
      musclesGroup = ['all', ...muscles][selectedTab];
      onTabSelect(musclesGroup);
    }, [selectedTab, exercisesList]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth={'xl'}>
          <Header exercisesList={exercisesList} addExercise={addExercise} />
          <Main
            sortedExercises={getExerciseByMusclesGroup()}
            exercises={filteredExercises}
            selectedExerciseId={selectedExerciseId}
            setSelectedExerciseId={setSelectedExerciseId}
            deleteExercise={deleteExercise}
            editExercise={editExercise}
          />
          <Footer
            muscles={muscles}
            onTabSelect={onTabSelect}
            setSelectedExerciseId={setSelectedExerciseId}
            selectedExerciseId={selectedExerciseId}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
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
