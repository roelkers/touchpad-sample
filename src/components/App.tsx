import React, { useState, } from 'react';
import Touchpad from './Touchpad'
import Join from './Join'
import Login from './Login'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { IAuthContext, IAppProps } from '../interfaces'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'
import SampleManager from './SampleManager'
import useFolders from '../hooks/useFolders'

export const AuthContext = React.createContext<IAuthContext | null>(null);

const App = (props: IAppProps) => {

  console.log("rerender app")
  
  const [audioContext,setAudioContext] = useState(new AudioContext())
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [configModeOn, setConfigModeOn]  = useState(false)
  const { folders, downloadingFolders, dispatchGetFolders } = useFolders()

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <div className="App">
      <Router>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <Toolbar setConfigModeOn={setConfigModeOn} configModeOn={configModeOn} />
        <Switch>
          <Route path='/play' exact render={() => <Touchpad audioContext={audioContext} storage={props.storage} folders={folders} configModeOn={configModeOn}/>} />
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
