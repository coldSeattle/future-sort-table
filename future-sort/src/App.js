import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Home } from './components/Home/Home';
import { BigDCOM } from './components/main/BigDCOM';
import { SmallDCom } from './components/main/SmallDCOM';



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={SmallDCom} path="/small" />
          <Route component={BigDCOM} path="/big" />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
