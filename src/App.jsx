import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import contractArtifact from "./utils/WavePortal.json";

export default function App() {
  const contractAddress = "0xfE63BB4d0D8C14A7e0cc0CC4c4b8100Dc13D3C12";
  const contractABI = contractArtifact.abi;
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      /*
       * Verify access to window.ethereum
       */
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
       * Verify if the user has authorized access to their accounts
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("MetaMask not found!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const highFive = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Ethereum object not found!");
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      let count = await wavePortalContract.getTotalWaves();
      console.log("Total number of High-Fives...", count.toNumber());

      const waveTxn = await wavePortalContract.wave();
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
      console.log("Total number of High-Fives...", count.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey Folks!</div>

        <div className="bio">
          I am souttodev and I am learning about web3 development. Cool, right?
          Connect your Ethereum wallet and send me a high-five!
        </div>

        <button className="waveButton" onClick={highFive}>
          Send High-Five 🌟
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
