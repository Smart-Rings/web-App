# Smart Rings - WebApp

## Overview

The Smart Rings WebApp allows users to generate solvency proofs for owning a specified amount of native tokens on designated blockchains. This application stands as a key component in demonstrating the ownership and solvency of blockchain assets.

## Key Features

- **Solvency Proof Generation**: Users can generate proofs of solvency for owning at least a specified amount of native tokens on a chosen blockchain and mint a Soulbound Token (SBT) that symbolizes their solvency on another blockchain.

- **Minting of SBT**: After generating the proof using our API, users have the ability to mint a Soulbound Token (SBT) that symbolizes their on-chain proof on another network.

- **Proof Verification**: Any generated proof can be verified through the WebApp using the token ID. It allows users to verify if a proof is still valid (ie: all the addresses in the ring still have the required amount of tokens).

## Usage

**To Test with Your Own Private Key** (which could be any integer):
- **Set the token amount to 0 if you do not have testnet tokens**.

## Security Notice

**Important**: The current implementation requires users to input their private keys directly, which are then sent through an unencrypted channel to our API. This method poses significant security risks.
Here we are using an api because we have to allow any user to test the poc without leaking the cryptographic implementation (The custom signature generation repository is in a separate private repository, reserved for future projects. It's currently awaiting an audit to ensure its security and reliability before being integrated into upcoming initiatives).

### Recommendations
- **For Testing Only**: Use this feature exclusively for testing purposes.
- **Use Burner Keys**: Employ burner private keys (keys created specifically for testing and without access to actual funds or valuable assets).
- **Avoid Real Assets**: Do not use this feature with private keys linked to real or valuable assets, particularly in a production environment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repo
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the app
   ```sh
    npm start
    ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Contribution

If you would like to contribute to this project, please feel free to submit a pull request. We welcome any and all contributions.

## Contact

If you have any questions, please feel free to reach out to us at `contact@cypherlab.fr`