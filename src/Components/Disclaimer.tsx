import React from 'react';
import '../styles/Disclaimer.css';
import '../styles/Main.css';

export default function Disclaimer() {
    return (
        <div className="disclaimer-banner">
            <p>
                This application is for testing purposes only. We do not recommend 
                using private keys that hold real funds on mainnet networks.
            </p>
            <p>
                We are working on integrating our ring signature library, <b>Alice's Ring</b>, with browser wallets 
                to avoid the need to paste private keys.
            </p>
            <p>
                <a href="https://github.com/hack-chainlink" target="_blank" rel="noopener noreferrer">
                    Docs & Tutorials
                </a>
            </p>
        </div>
    );
}
