import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Launcher } from './components/Launcher';
import { Landing } from './components/Landing';
import { Home } from './components/Home';
import { FhirClientProvider } from './components/FhirClientProvider';
import { Observation } from './components/Observation';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: 'white',
      disabled: 'white'
    },
    primary: {
      main: '#FE6B8B',
    },
    secondary: {
      main: '#bababa'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FhirClientProvider>
        <Router>
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/launcher">
                <Launcher />
              </Route>
              <Route exact path="/home">
                  <Observation />
              </Route>
              <Route exact path="/observation">
                  <Observation />
              </Route>
            </Switch>
          </Router>
        </FhirClientProvider>
      </ThemeProvider>
  );
}

export default App;
