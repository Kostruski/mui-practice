import React, { useState } from 'react';
import { Container, Box } from '@material-ui/core';
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

  // const getExerciseByMusclesGroup = musclesGroup => {
  //   if (musclesGroup === 'all') return setExercisesList(exercises);
  //   const selectedExercises = exercises.filter(exercise => {
  //     return exercise.muscles === musclesGroup;
  //   });
  //   return setExercisesList(selectedExercises);
  // };

  const getExerciseByMusclesGroup = () => {
    return Object.entries(exercisesList.reduce((accumulatedExercises, currentExercise) => {
      const { muscles } = currentExercise;
      accumulatedExercises[muscles] = accumulatedExercises[muscles]
        ? [...accumulatedExercises[muscles], currentExercise]
        : [currentExercise];
      
      return accumulatedExercises;
    }, {}));
  };

 


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth={'xl'}>
          <Header />
          <Main exercises={getExerciseByMusclesGroup()} />
          <Footer
            muscles={muscles}
            getExerciseByMusclesGroup={getExerciseByMusclesGroup}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

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
