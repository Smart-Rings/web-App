export interface INonEVMMinter {
    address: `0x${string}`;
    abi: any[]; // Remplacer par le type approprié pour votre ABI
}

export const fujiMinter: INonEVMMinter = {
    address : `0xDeE5038B40353fdc9a4c611B96dD2335847b62fC`,
        abi : [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "source",
                        "type": "string"
                    }
                ],
                "name": "addSourceFunction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "changeOwner",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "SBTAddress",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "EmptyArgs",
                "type": "error"
            },
            {
                "inputs": [],
                "name": "EmptySource",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "requestId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "response",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "err",
                        "type": "bytes"
                    }
                ],
                "name": "handleOracleFulfillment",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "newGasLimit",
                        "type": "uint32"
                    }
                ],
                "name": "modifyGasLimit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "NoInlineSecrets",
                "type": "error"
            },
            {
                "inputs": [],
                "name": "OnlyRouterCanFulfill",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "removeSourceFunction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "id",
                        "type": "bytes32"
                    }
                ],
                "name": "RequestFulfilled",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "id",
                        "type": "bytes32"
                    }
                ],
                "name": "RequestSent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "requestId",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "response",
                        "type": "bytes"
                    },
                    {
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "err",
                        "type": "bytes"
                    }
                ],
                "name": "Response",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "source",
                        "type": "string"
                    },
                    {
                        "internalType": "enum FunctionsRequest.Location",
                        "name": "secretsoLcation",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string[]",
                        "name": "args",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string",
                        "name": "uri",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "message",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "ring",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "responses",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "c",
                        "type": "uint256"
                    }
                ],
                "name": "sendRequest",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "donId",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "gasLimit",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "s_lastError",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "s_lastRequestId",
                "outputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "s_lastResponse",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "SBTContract",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "senderOfRequest",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "source_functions",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes32",
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "uriOfRequest",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]

}