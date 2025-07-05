import React from "react";
import { ethers } from "ethers";
import "./App.css";

export default function App() {

  const wave = () => {
    
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey Folks!</div>

        <div className="bio">
          I am souttodev and I am learning about web3 development. Cool, right? Connect
          your Ethereum wallet and send me a high-five!
        </div>

        <button className="waveButton" onClick={wave}>
          Send High-Five 🌟
        </button>
      </div>
    </div>
  );
}
