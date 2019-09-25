import React, { useState } from 'react';
import './App.css';
import Touchpad from './Touchpad'
import Join from './Join'
import Login from './Login'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import config from './firebase.config'
import * as firebase from 'firebase'
import { IAuthContext } from './interfaces'

firebase.initializeApp(config)

export const AuthContext = React.createContext<IAuthContext | null>(null);

const App: React.FC = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <div className="App">
      <Router>
        <Switch>
          <Route path='/play' exact render={() => <Touchpad />} />
          <Route path='/join' exact render={() => <Join />} />
          <Route path='/login' exact render={() => <Login />} />
        </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
