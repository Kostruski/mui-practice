import React, { Suspense, lazy } from 'react';
import { Container, Box } from '@material-ui/core';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';


import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';
// const TableContainer = lazy(() => import('./components/TableContainer'));

const theme = createMuiTheme({
  palette: {
    primary: { main: '#5D1360' },
    secondary: { main: '#D0A60A' },
    text: { primary: '#1D1717' },
    padding: '1rem'
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth={'xl'}>
          <Header />
          <Main />
          <Footer />
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
