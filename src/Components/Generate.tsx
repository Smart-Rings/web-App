import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sepoliaMinter,mumbaiMinter,fujiMinter } from '../contracts';
import { useWaitForTransaction } from 'wagmi';
import { useContractWrite, usePrepareContractWrite,useNetwork } from 'wagmi'
import '../styles/Main.css';
import '../styles/Forms.css';
import { sourceBTC, sourceEVM, sourceXRPL } from './sourceCode';

interface INonEVMMinter {
    address: `0x${string}`;
    abi: any[]; // Remplacer par le type approprié pour votre ABI
}


export function Generate() {

    const [privKey, setPrivateKey] = useState('');
    const [amount, setAmount] = useState('');
    const [network, setNetwork] = useState('BTC');
    const [loading, setLoading] = useState(false);
    const [CID, setCID] = useState('');
    const [message, setMessage] = useState('');
    const [c, setC] = useState('');
    const [ringAddresses, setRingAddresses] = useState([]);
    const [ring, setRing] = useState([]);
    const [responses, setResponses] = useState([]);
    const [isProofGenerated, setIsProofGenerated] = useState(false);
    const {chain} = useNetwork();
    const [apiResponse, setApiResponse] = useState({ message: '', type: '' });
    const [selectedContractConfig, setSelectedContractConfig] = useState<INonEVMMinter>(sepoliaMinter);
    const [transactionResult, setTransactionResult] = useState({ hash: '', error: '' });
    const [isTransactionProcessing, setIsTransactionProcessing] = useState(false);
    console.log('Chain : ',chain);

    useEffect(() => {
        if (chain?.id) {
            switch (chain.id) {
                case 11155111: // Remplacez par l'ID de chaîne réel pour Sepolia
                    setSelectedContractConfig(sepoliaMinter);
                    break;
                case 80001: // Remplacez par l'ID de chaîne réel pour Mumbai
                    setSelectedContractConfig(mumbaiMinter);
                    break;
                case 43113: // Remplacez par l'ID de chaîne réel pour Fuji
                    setSelectedContractConfig(fujiMinter);
                    break;
                // Ajoutez d'autres cas au besoin
                default:
                    setSelectedContractConfig(sepoliaMinter);
                    break;
            }
        }
    }, [chain?.id]);

    interface Props {
        items: string[];
      }
      
      const BulletPointList: React.FC<Props> = ({ items }) => {
        return (
          <ul style={{ listStyleType: 'none' }}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      };

    /**
     * Function that call the API to generate the proof
     * THE API need to have in input
     * the ring which for the moment is empty and mocked in the API
     * the network that is also the asset (Bitcoin = BTC etc....)
     * the amount to proove
     * the private key
     */
    const handleGenerateProof = async () => {
        try {
            setLoading(true);
            setApiResponse({ message: '', type: '' });
            // Call your API to generate the proof using privateKey, amount, and asset
            const response = await axios.post('http://89.58.41.130:8080/api/sign/', {
                ring: [],
                network: network, // BTC,XRPL,ETH,POLYGON,AVALANCHE
                amount: amount, // ammount to send
                privKey: privKey, // private key
            });
            console.log("Generation response:\n");
            console.log(response);
            if (response.data.CID === undefined || response.data.message === undefined || response.data.c === undefined || response.data.ring === undefined || response.data.responses === undefined) {
                setIsProofGenerated(false);
                setApiResponse({ 
                    message: "Failed to generate proof", 
                    type: 'error' 
                });
            }
            else {
                setApiResponse({ 
                    message: "Proof generated successfully", 
                    type: 'success' 
                });
                setCID(response.data.CID.IpfsHash);
                setMessage(response.data.message);
                setC(response.data.c);
                setRing(response.data.ring);
                setRingAddresses(response.data.ringAddress);
                setResponses(response.data.responses);
                setIsProofGenerated(true);
            }
        } catch (error) {
            console.error('Error generating proof:', error);
            setApiResponse({ 
                message: `Error generating proof: ${error}`, 
                    type: 'error' 
            });
            setIsProofGenerated(false);
        } finally {
            setLoading(false);
        }
    };

    



    /**
     * this is the smart contract function that we call 
     *   function sendRequest(
        string calldata source, => this will be modified with the name of the source with krkmu update sourceBTC
        FunctionsRequest.Location secretsoLcation, harcoded to 2
        string[] calldata args, args to use in the source code sourceCodeArgs, MUST be [amount, returnedAddressRing]
        string calldata uri, the uri of the NFT the returned CID
        uint256 message, the message that has been signed, message
        uint256[] memory ring, the ring of PUBLIC KEY, ring
        uint256[] memory responses, the repsponses , responses
        uint256 c the c value , c
    ) external returns (bytes32) {
     */

    // this function will first verify the cryptography ans then the holding of the fund for each address in the ring
    // if everything is ok it will mint a NFT on the callback from chainlink

    // Sélectionner la configuration en fonction du réseau


    
    const ringMapped = ring.map((point) => {
        return [BigInt(point)]
    }).flat();
  
    const responseMapped = responses.map((point) => {
        return [BigInt(point)]
    }).flat();

    const bigMessage =BigInt(message);
    const bigC = BigInt(c);


    let args;
    if (network === "BTC") {
        // BTC to satoshi
        const sourceCodeArgs = [(parseFloat(amount)* 10**8),...ringAddresses];
        args = [sourceBTC, 2, sourceCodeArgs, CID, bigMessage, ringMapped, responseMapped, bigC];
    } 
    if (network === "ETH") {
        // ETH to wei
        const sourceCodeArgs = [(parseFloat(amount)* 10**18).toString(),'eth-sepolia',...ringAddresses];
        args = [sourceEVM, 2, sourceCodeArgs, CID, bigMessage, ringMapped, responseMapped, bigC];
    }
    if (network === "MATIC") {
        // MATIC to wei
        const sourceCodeArgs = [(parseFloat(amount)* 10**18).toString(),'matic-mumbai',...ringAddresses];
        args = [sourceEVM, 2, sourceCodeArgs, CID, bigMessage, ringMapped, responseMapped, bigC];
    }
    if (network === "AVAX") {
        // AVAX to wei
        const sourceCodeArgs = [(parseFloat(amount)* 10**18).toString(),'avalanche-testnet',...ringAddresses];
        args = [sourceEVM, 2, sourceCodeArgs, CID, bigMessage, ringMapped, responseMapped, bigC];
    }

    if (network === "ZkEVM") {
        // AVAX to wei
        const sourceCodeArgs = [(parseFloat(amount)* 10**18).toString(),'polygon-zkevm-testnet',...ringAddresses];
        args = [sourceEVM, 2, sourceCodeArgs, CID, bigMessage, ringMapped, responseMapped, bigC];
    }
    if (network === "XRP") {
        // XRP to drops
        const sourceCodeArgs = [(parseFloat(amount)* 10**6),...ringAddresses];
        args = [sourceXRPL, 2, sourceCodeArgs, CID, bigMessage, ringMapped, responseMapped, bigC];
    }
    console.log(args);

    let contractWriteConfig;
    if (chain && selectedContractConfig) {
        contractWriteConfig = {
            chainId: chain.id,
            address: selectedContractConfig.address,
            abi: selectedContractConfig.abi,
            functionName: 'sendRequest',
            args: args,
            gas: 1000000n,
        };
    }

    const { config, error } = usePrepareContractWrite(contractWriteConfig);
    if(error){
         console.log("Error when preparing contract :",error);
    }

    const { write, data:txdata } = useContractWrite(config);

    useWaitForTransaction({
        hash: txdata?.hash,
        onSuccess: (txdata) => {
            setTransactionResult({ hash: txdata.transactionHash, error: '' });
            setIsTransactionProcessing(false);
        },
        onError: (error) => {
            setTransactionResult({ hash: '', error: error.message });
            setIsTransactionProcessing(false);
        },
    });

    const handleClaim = async () => {
        setIsTransactionProcessing(true);
        if (isProofGenerated && config) {
            try {
                await write?.();
            } catch (error) {
                console.error('Error during contract write:', error);
                setIsTransactionProcessing(false);
            }
        }
    };


    return (
        <div className='centered-div'>
            <div className='form-container'>
                <label className='label'>
                    Paste Private Key:
                    <input
                        type="password"
                        value={privKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                        className='form-input'
                    />
                </label>
                <label className='label'>
                    Select Amount & Network:
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='form-input'
                        placeholder='Amount'
                    />
                    <select value={network} onChange={(e) => setNetwork(e.target.value)} className='network-select'>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="MATIC">MATIC</option>
                        <option value="ZkEVM">POL-ZkEVM</option>
                        <option value="AVAX">AVAX</option>
                        <option value="XRP">XRP</option>

                    </select>
                </label>
                <div className='centered-div2'>
                    <button 
                        className='principal-button' 
                        onClick={handleGenerateProof} 
                        disabled={loading}
                    >
                        {loading ? 'Pending...' : 'Ring it !'}
                    </button>
                </div>
                <div className='centered-div2'>
                    
                    {!loading && apiResponse.message && (
                        <div className={`response-display ${apiResponse.type}`}>
                            {apiResponse.message}
                        </div>
                    )}
                </div>
            </div>
            {isProofGenerated && (
                <div className='centered-div'>
                    <div className="mnemonic-container">
                    <p className="mnemonic-text"><b>Ring :</b> <BulletPointList items={ringAddresses}/></p>

                    </div>
                    <div className='centered-div2'>
                    <button className='principal-button' onClick={handleClaim} disabled={!write || isTransactionProcessing}>
                        {isTransactionProcessing ? 'Processing...' : 'Claim your proof (SBT) !'}
                    </button>
                    </div>
                    <div className='centered-div2'>
                        {!isTransactionProcessing && transactionResult.hash && (
                            <div className='response-display success'>
                                Success !<br></br>
                                Transaction hash: {transactionResult.hash}
                            </div>
                        )}
                        {!isTransactionProcessing && transactionResult.error && (
                            <div className='response-display error'>
                                Error: {transactionResult.error}
                            </div>
                        )}
                    </div>
                </div>

            )}
        </div>
    );
};

export default Generate;