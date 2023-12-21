import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import '../styles/Main.css';
import '../styles/Forms.css';

export function Verify() {
    const [network, setNetwork] = useState('eth-sepolia');
    const [proofid, setproofid] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState({ message: '', type: '' });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const apiResponse = await axios.post('http://89.58.41.130:8080/api/verify/', { network, proofid });
            const { validity, threshold, currency } = apiResponse.data;
            const currentDate = new Date().toLocaleString();
            if (validity) {
                setResponse({
                    message: `Your proof is valid at the current time (${currentDate}), for an amount of ${threshold} ${currency}`,
                    type: 'success'
                });
            } else {
                setResponse({
                    message: "Your proof is invalid.",
                    type: 'error'
                });
            }
        } catch (error) {
            setResponse({
                message: "Error while verifying the proof. Please try again later.",
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='centered-div'>
            <form onSubmit={handleSubmit} className='form-container'>
                <label className='label'>
                    Select Network:
                    <select value={network} onChange={(e) => setNetwork(e.target.value)} className='network-select'>
                        <option value="eth-sepolia">ETH SEPOLIA</option>
                        <option value="polygon-mumbai">POLYGON MUMBAI</option>
                        <option value="avalanche-fuji">AVALANCHE FUJI</option>
                    </select>
                </label>
                <label className='label'>
                    PROOF ID:
                    <input 
                        type="text" 
                        value={proofid} 
                        onChange={(e) => setproofid(e.target.value)} 
                        className='form-input' 
                    />
                </label>
                <div className='centered-div2'>
                    <button 
                        type="submit" 
                        disabled={isLoading || proofid.trim() === ''} 
                        className='principal-button'
                    >
                        {isLoading ? 'Verifying...' : 'Verify it !'}
                    </button>
                </div>
            </form>
            {!isLoading && response.message && (
                <div className={`response-display ${response.type}`}>
                    {response.message}
                </div>
            )}
        </div>
    );
}

export default Verify;
