import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {
  Link
} from "react-router-dom";

export const Landing = () => {
    return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to={`/launcher${window.location.search}`}>Launch</Link>
        </header>
    </div>
  )

}