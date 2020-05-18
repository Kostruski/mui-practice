import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { muscles, exercises } from './store';
import { setExercisesList, onTabSelect } from './actions';
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
  // const [exercisesList, setExercisesList] = useState(exercises);
  // const [selectedTab, setSelectedTab] = useState(0);
  // const [selectedExercise, setSelectedExercise] = useState(null);
  // const [filteredExercises, setFilteredExercises] = useState([]);
  const dispatch = useDispatch();

  console.log('app renders ...');

  const {
    exercisesList,
    filteredExercises,
    selectedTab,
    musclesGroups,
    selectedExercise,
  } = useSelector(state => state.exercises);



  

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
