import { useState, useRef, useEffect } from 'react';
import calc from './scripts.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import './pacing.css';

export default function Pacing() {
  const[distanceIndex, setIndex] = useState(0);
  const[customDistance, setCustom] = useState(0);
  const[isPace, setPaceOrSplit] = useState(true);
  const[isCustom, setCustomToggle] = useState(true);
  const[min, setMin] = useState(0);
  const[sec, setSec] = useState(0);
  const[output, setOutput] = useState('');


  
  const distanceDropdown = useRef(null);

  

  useEffect(() => {
    if(min>0 && sec>0 && distanceIndex>0){
      setOutput(calc(distanceIndex,min*60+sec,customDistance,isPace));
    }
  },[distanceIndex,min,sec,customDistance,isPace]);

  useEffect(() => {
    if(distanceIndex == 1){
      setCustomToggle(false);
    }
    else{
      distanceDropdown.current.selectedIndex = distanceIndex;
    }
  },[distanceIndex]);


  const handleChange = event => {
    if(event.target.id == "disDrop"){
      setIndex(event.target.selectedIndex*1);
    }
    else if(event.target.id == "exitCustom"){
      setCustomToggle(true);
      setIndex(0);
    }
    else if(event.target.id == "minute-input"){
      setMin(event.target.value*1);
    }
    else if(event.target.id == "second-input"){
      setSec(event.target.value*1);
    }
    else if(event.target.id == "customInput"){
      setCustom(event.target.value*1);
    }

  }

  return (
    <>
      <section className="section title-box">
    <p className="main-title" id="titleBox">
    {isPace ? <span>Split</span> : <span>Pace</span>} Calculator
    </p>
  </section>
  <section className="cols">
    <div className="col" id="left-col">
      <section style={{margin: 0, width: "100%", padding: 0 }}>
        <div className="control half-container">
          <div className="time-input">
            <input
              id="minute-input"
              type="number"
              className="input is-m-large half-input"
              onChange={handleChange}
            />
            <label htmlFor="second-input" className="label time-label">
              :
            </label>
            <input
              id="second-input"
              type="number"
              className="input is-m-large half-input"
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className="select is-m-large half-container"
          style={{ position: "relative" }}
          id="disDropCont"
        >
          <select id="disDrop" ref={distanceDropdown} className="overlaying bottom" onChange = {handleChange}>
            <option>Distance</option>
            <option>Custom</option>
            <option>800</option>
            <option>Mile</option>
            <option>Two Mile</option>
            <option>5k</option>
            <option>8k</option>
            <option>10k</option>
          </select>
          <div id="customField" className={isCustom ? "time-input overlaying top hide" : "time-input overlaying top"}>
            <input
              type="number"
              id="customInput"
              className="input is-m-large"
              onChange={handleChange}
            />
            <div id="exitCustom" className="icon exit-red" onClick={handleChange}>
              <FontAwesomeIcon id="icon" icon={faBan} />
            </div>
          </div>
        </div>
      </section>
      <section className="section pace-split-container">
        <button id="pace-split" className="button is-m-large half-button" onClick = {() => setPaceOrSplit(!isPace)}>
          Switch to {isPace ? <span>Pace</span> : <span>Split</span>}
        </button>
          <button className="button is-m-large half-button" id="home-button">
            Home
          </button>
      </section>
    </div>
    <section className="section pacing-output-box output-box col">
      <p id="pacing-output">{output}</p>
    </section>
  </section>
    </>
  )

  }