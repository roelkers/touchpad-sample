import React, { useState, } from 'react';
import App from './App'
import config from '../firebase.config'
import * as firebase from 'firebase'

firebase.initializeApp(config)
const storage = firebase.storage()

const AppWrapper: React.FC = () => {
    console.log("rerender app wrapper")
  
    const [audioContext,setAudioContext] = useState(new AudioContext())
  return (
    <App audioContext={audioContext} storage={storage} />
  );
}

export default AppWrapper;
