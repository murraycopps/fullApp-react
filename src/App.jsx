import './App.css';
import Vdot from './vdot/load';
import Home from './home/load';
import Pacing from './pacing/load';
import Unusual from './unusual/load';
import { useState, useRef, useEffect } from 'react';
import * as lib from './lib.jsx';

export default function App() {
  const [scene, updateScreen] = useState(<Home/>);

  const checkUpdate = event => {
    var id = event.target.id;
    console.log(id)
    if(id == "load-vdot"){
      updateScreen(<Vdot/>);
    }
    else if(id == "home-button"){
      updateScreen(<Home/>);
    }
    else if(id=="load-pacing"){
      updateScreen(<Pacing/>);
    }
    else if(id=="load-unusual"){
      updateScreen(<Unusual/>);
    }
  }
  
  return (
    <main onClick = {checkUpdate}>
      {scene}
    </main>
  )
}
