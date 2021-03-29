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


function App() {
  return (
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
                <Home />
            </Route>
            <Route exact path="/observation">
                <Observation />
            </Route>
          </Switch>
        </Router>
      </FhirClientProvider>
  );
}

export default App;
