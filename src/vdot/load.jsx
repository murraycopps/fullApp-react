
import { useState, useRef, useEffect } from 'react';
import * as vdot from './scripts.jsx';
import { DISTANCES, vdotTable } from './table.jsx';
import './vdot.css';


export default function Vdot() {
  var min = 0;
  var sec = 0;
  const [myVdot, setVdot] = useState('');
  const [label, setLabel] = useState('');
  const [output, setOutput] = useState('');

  var minBox;
  var secBox;
  var disDrop;
  var distance;
  const [isRace, setRace] = useState(false);
  const [isTime, setTime] = useState(false);
  const [isTimeOverride, setTimeOverride] = useState(false);


  useEffect(() => {
    handleChange();
  }, [isRace]);

  useEffect(() => {
    handleChange();
  }, [isTime]);

  const changeVariables = event => {
    console.log(event.target.id+" a");
    if (event.target.id == "toggle-race-button") {
      if (!isRace) {
        setTime(true);
      }
      else if (!isTimeOverride) {
        setTime(false);
      }
      isRace ? setRace(false) : setRace(true);
    }
    else if (!isRace) {
      isTime ? setTime(false) : setTime(true);
      isTimeOverride ? setTimeOverride(false) : setTimeOverride(true);

    }


  }


  const handleChange = () => {
    minBox = minBoxRef.current;
    secBox = secBoxRef.current;
    disDrop = disDropRef.current;
    min = minBox.value * 1;
    sec = secBox.value * 1
    distance = DISTANCES[disDrop.selectedIndex - 1];

    if (isNaN(min) || isNaN(sec) || distance === undefined) {
      return;
    }

    var myVdotTemp = vdot.findVdot(min * 60 + sec, distance);
    setVdot("Vdot: " + myVdotTemp["vdotDec"]);

    var outputs = vdot.extractVdotTimes(myVdotTemp, isRace, isTime);
    setOutput(outputs.join('\n'));

    var outputLables = vdot.getVdotLables(isRace);
    setLabel(outputLables.join('\n'));
    console.log(label)
  };



  const minBoxRef = useRef(null);
  const secBoxRef = useRef(null);
  const disDropRef = useRef(null);



  return (
    <>
      <section className="section title-box">
        <p className="main-title" id="titleBox" >
          Vdot Calculator
        </p>
      </section>
      <section className="cols">
        <div className="col" id="left-col">
          <section style={{ width: "100%", margin: 0, padding: 0 }}>
            <div className="control half-container">
              <div className="time-input">
                <input
                  id="minute-input"
                  type="number"

                  ref={minBoxRef}
                  className="input is-m-large half-input"
                  onChange={handleChange}
                />
                <label htmlFor="second-input" className="label time-label">
                  :
                </label>
                <input
                  id="second-input"
                  type="number"

                  ref={secBoxRef}
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
              <select
                id="disDrop"
                className="overlaying bottom"
                ref={disDropRef}
                onChange={handleChange}
              >
                <option>Distance</option>
                <option>1500</option>
                <option>Mile</option>
                <option>3000</option>
                <option>Two Mile</option>
                <option>5k</option>
                <option>10k</option>
                <option>15k</option>
                <option>Half Marathon</option>
                <option>Marathon</option>
              </select>
            </div>
          </section>
          <div className="col" id="left-col">
            <section style={{ width: "100%", margin: 0, padding: 0 }}>
              <div className="is-m-large half-container">
                <button
                  id="toggle-race-button"
                  className="button wide is-m-large"
                  onClick={changeVariables}
                >
                  {isRace ? <span>Training</span> : <span>Race</span>}
                </button>
              </div>
              <div
                className="is-m-large half-container"
                style={{ position: "relative" }}
              >
                <button
                  id="time-time-button"
                  className="button wide is-m-large"
                  onClick={changeVariables}
                >
                  {isTime ? <span>Pace</span> : <span>Time</span>}
                </button>
              </div>
            </section>
          </div>
          <section id="vdot-output-box" className="section output-box col">
            <p id="vdot-vdot-output">{myVdot}</p>
            <p id="vdot-output-label" >{label}</p>
            <p id="vdot-time-output" >{output}</p>
          </section>
        </div>
        <div className="is-m-large">
          <button id="home-button" className="is-m-large button m-wide">Home</button>
        </div>
      </section>
    </>
  )
}
