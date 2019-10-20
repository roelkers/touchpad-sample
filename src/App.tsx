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
import SampleManager from './SampleManager'
import useFilelist from './useFilelist'

firebase.initializeApp(config)
const storage = firebase.storage()

export const AuthContext = React.createContext<IAuthContext | null>(null);

const App: React.FC = () => {

  const [audioContext, setAudioContext] = useState<AudioContext>(new AudioContext())
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [configModeOn, setConfigModeOn]  = useState(false)
  const { files, downloading, dispatchGetFiles } = useFilelist()

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <div className="App">
      <Router>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Toolbar setConfigModeOn={setConfigModeOn} configModeOn={configModeOn} />
        <Switch>
          <Route path='/play' exact render={() => <Touchpad audioContext={audioContext} storage={storage} files={files} configModeOn={configModeOn}/>} />
          <Route path='/join' exact render={() => <Join />} />
          <Route path='/login' exact render={() => <Login />} />
          <Route path='/samples' exact render={() => <SampleManager files={files} downloadingFiles={downloading} dispatchGetFiles={dispatchGetFiles} />} />
        </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
