import * as lib from '../lib.jsx';
import { useState, useRef, useEffect } from 'react';
import './unusual.css';
import {calcuate} from './scripts.jsx';

export default function Home() {
    const [unitTime, setUnitTime] = useState('');
    const [output, setOutput] = useState('');
    const [outDis, setOutDis] = useState([0]);
    const [lastDis, setLastDis] = useState(0);
    var inDis;

    
    useEffect(() => {
        // console.log("useEffect");
        // console.log(outDis);
        setOutput(calcuate(unitTime, outDis,lastDis));
    }, [unitTime, lastDis]);

    const handleChange = ()=> {
        var hour = hourBox.current.value;
        var min = minBox.current.value;
        var sec = secBox.current.value;
        var time = hour * 3600 + min * 60 + sec * 1;
        inDis = disInput.current.value * 1;
        var tempUnitTime = time / inDis;
        setUnitTime(tempUnitTime); 
        setLastDis(outDisInput.current.value * 1);    
    }
   
    const addOutput = event => {
        var tempOutDis = outDis;
        if(tempOutDis[tempOutDis.length-1] == 0) return;
        tempOutDis.push(0);
        if(tempOutDis.length == 11) tempOutDis.shift();
        setOutDis(tempOutDis);
        setLastDis(0);
        outDisInput.current.value = 0;
        event.target.classList.add('red');
        setTimeout(() => {
            event.target.classList.remove('red');
        }, 500);
    }

    const hourBox = useRef(null);
    const minBox = useRef(null);
    const secBox = useRef(null);
    const disInput = useRef(null);
    const outDisInput = useRef(null);

  return (
    <div onChange={handleChange}>
      <section className="section title-box">
    <p className="main-title" id="titleBox">
      Unusual
    </p>
  </section>
  <section className="cols">
    <input
      id="input-distance"
      type="number"
      className="input is-m-large wide"
      ref={disInput}
    />
    <div className="control time-input u-time-input is-m-large">
      <input id="u-hour" type="number" className="input is-m-large third-input" ref={hourBox}/>
      <label htmlFor="u-min" className="label time-label u-left">
        :
      </label>
      <input id="u-min" type="number" className="input is-m-large third-input" ref={minBox}/>
      <label htmlFor="u-sec" className="label time-label u-right">
        :
      </label>
      <input id="u-sec" type="number" className="input is-m-large third-input" ref={secBox}/>
    </div>
    <input
      id="output-distance"
      type="number"
      className="input is-m-large wide"
      ref={outDisInput}
    />
  </section>
  <section id="u-output-box" className="section output-box col">
    <p id="u-output" >{output}</p>
    <button id="plus-button" className="u-plus" onClick={addOutput}>
      +
    </button>
  </section>
  <section className="section pace-split-container">
    <button id="reset" className="button is-m-large half-button">
      Reset
    </button>
    <button className="button is-m-large half-button" id="home-button">
      Home
    </button>
  </section>
    </div>
  )
}
