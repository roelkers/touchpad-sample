import React, { useState, } from 'react';
import Touchpad from './components/Touchpad'
import Join from './components/Join'
import Login from './components/Login'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import config from './firebase.config'
import * as firebase from 'firebase'
import { IAuthContext } from './interfaces'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import SampleManager from './components/SampleManager'
import useFilelist from './hooks/useFilelist'
import useFolders from './hooks/useFolders'

firebase.initializeApp(config)
const storage = firebase.storage()

export const AuthContext = React.createContext<IAuthContext | null>(null);

const App: React.FC = () => {

  console.log("rerender app")
  
  const [audioContext,setAudioContext] = useState(new AudioContext())
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [configModeOn, setConfigModeOn]  = useState(false)
  const { folders, downloadingFolders, dispatchGetFolders } = useFolders()

  // useEffect(()=>{
  //   setAudioContext(new AudioContext())
  // })

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <div className="App">
      <Router>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Toolbar setConfigModeOn={setConfigModeOn} configModeOn={configModeOn} />
        <Switch>
          <Route path='/play' exact render={() => <Touchpad audioContext={audioContext} storage={storage} folders={folders} configModeOn={configModeOn}/>} />
          <Route path='/join' exact render={() => <Join />} />
          <Route path='/login' exact render={() => <Login />} />
          <Route path='/samples' exact render={() => <SampleManager folders={folders}/>} />
        </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
