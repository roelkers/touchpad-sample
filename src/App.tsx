import React, { useState } from 'react';
import Touchpad from './Touchpad'
import Join from './Join'
import Login from './Login'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import config from './firebase.config'
import * as firebase from 'firebase'
import { IAuthContext } from './interfaces'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'

firebase.initializeApp(config)

export const AuthContext = React.createContext<IAuthContext | null>(null);

const App: React.FC = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [configModeOn, setConfigModeOn]  = useState(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <div className="App">
      <Router>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Toolbar setConfigModeOn={setConfigModeOn} configModeOn={configModeOn} />
        <Switch>
          <Route path='/play' exact render={() => <Touchpad configModeOn={configModeOn}/>} />
          <Route path='/join' exact render={() => <Join />} />
          <Route path='/login' exact render={() => <Login />} />
        </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
