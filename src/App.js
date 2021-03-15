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


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/launcher">
            <Launcher />
          </Route>
          <Route exact path="/home">
            <FhirClientProvider>
              <Home />
            </FhirClientProvider>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
