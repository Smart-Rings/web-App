import React, { useState, useEffect } from 'react';
import '../styles/Main.css';
import "../styles/Arrow.css"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Generate } from './Generate';
import { Verify } from './Verify';
import Disclaimer from './Disclaimer'; 


function Main() {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const storedCurrentStep = localStorage.getItem('currentStep');
  let initialStep = 1;
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  if (storedCurrentStep) {
    initialStep = parseInt(storedCurrentStep, 10);
  }

  useEffect(() => {
    if(address&&isConnected){
      setCurrentStep(2);
    }
    else
    {
      setCurrentStep(1);
    }
    console.log(currentStep);
    
  }, [currentStep, address, isConnecting, isDisconnected, isConnected]);


  return (
    <body>
      <Disclaimer /> 
      <div className="main">
      <br></br>
      <h1 className=''>Don't show it, Ring it.</h1>
        {currentStep >= 1 && (
          <div className="description-container">
            <h2>📜 Proof Generator</h2>
            <br></br>
            <h2>🔑STEP 1 : Connect your Wallet</h2>
            <br></br>
            <div className='centered-div2'>
              <ConnectButton/>
            </div>
            {currentStep >= 2 && (
              <div className="arrows">
                <svg>
                  <path className="a1" d="M0 0 L30 32 L60 0"></path>
                  <path className="a2" d="M0 20 L30 52 L60 20"></path>
                  <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
              </div>
            )}
          </div>
        )}

        {isConnected && currentStep >= 2 && (
          <div className="description-container">
            <h2>⚙️ STEP 2 : Generate your proof</h2>
            <Generate/>
            {currentStep >= 3 && (

              <div className="arrows">
                <svg>
                  <path className="a1" d="M0 0 L30 32 L60 0"></path>
                  <path className="a2" d="M0 20 L30 52 L60 20"></path>
                  <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
              </div>
            )}
          </div>
        )}
        {currentStep >= 1 && (
          <div className="description-container">
            <h2>✅ Proof Verifier</h2>
              <Verify/>
          </div>
        )}
        

        <footer>
          <p>
            Build by <b><a href="https://www.cypherlab.fr"> Cypher Lab</a></b> Team.
          </p>
        </footer>
      </div>
    </body>
  );
}

export default Main;
