import * as lib from '../lib.jsx';
import { useState, useRef, useEffect } from 'react';
import './home.css';

export default function Home() {
  return (
    <>
      <section className="section title-box">
        <p className="home-main-title main-title" id="titleBox">
          Running Calculator
        </p>
      </section>
      <section className="home-cols cols">
        <div id="button-box">
          <button id="load-pacing" className="home-wide home-button button is-m-large">Pacing</button>
          <button id="load-vdot" className="home-wide home-button button is-m-large">Vdot</button>
          <button id="load-unusual" className="home-wide home-button button is-m-large">Unusual</button>
          {/* <button id="load-timer" className="home-wide home-button button is-m-large">Timer</button> */}
        </div>
      </section>
    </>
  )
}
