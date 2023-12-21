export const sourceBTC = "const threshold = args[0]\r\n" +
    "const addresses = args.slice(1)\r\n" +
    "const balanceCheckUrls = addresses.map(address => `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);\r\n" +
    "\r\n" +
    "const responses = await Promise.all(\r\n" +
    "    balanceCheckUrls.map(url => Functions.makeHttpRequest({ url: url }))\r\n" +
    ");\r\n" +
    "const allAboveThreshold = responses.every(response => parseInt(response.data.balance) >= parseInt(threshold));\r\n" +
    "return Functions.encodeString(allAboveThreshold.toString());\r\n";

export const sourceEVM = "const threshold = args[0];\n" +
"const network = args[1];\n" +
"const balanceCheckUrls = [];\n" +
"for (let i = 2; i < args.length; i++) {\n" +
"    balanceCheckUrls.push(`https://api.covalenthq.com/v1/${network}/address/${args[i]}/balances_native/?key=cqt_rQx3B8YqQ4DmMRMJyw9rHQWRTqrx`);\n" +
"}\n" +
"const balances = [];\n" +
"for (const url of balanceCheckUrls) {\n" +
"    const response = await Functions.makeHttpRequest({ url: url });\n" +
"    balances.push(response.data.data.items[0].balance);\n" +
"}\n" +
"const allAboveThreshold = balances.every(balance => parseInt(balance) >= parseInt(threshold));\n" +
"return Functions.encodeString(allAboveThreshold.toString());";

export const sourceXRPL = "const threshold = args[0];\n" +
"const balances = [];\n" +
"for (let i = 1; i < args.length; i++) {\n" +
"    const response = await Functions.makeHttpRequest({ \n" +
"        url: 'https://capable-wider-energy.xrp-testnet.quiknode.pro/ba995f441637d03f2980192dbb7f7e422167bc61/',\n" +
"        method: 'POST',\n" +
"        headers: {\n" +
"            'Content-Type': 'application/json',\n" +
"        },\n" +
"        data: {\n" +
"            method: 'account_info',\n" +
"            params: [{\n" +
"                account: args[i],\n" +
"                ledger_index: 'current',\n" +
"                queue: true\n" +
"            }]\n" +
"        },\n" +
"    });\n" +
"    balances.push(response.data.result.account_data.Balance);\n" +
"}\n" +
"const allAboveThreshold = balances.every(balance => parseInt(balance) >= parseInt(threshold));\n" +
"return Functions.encodeString(allAboveThreshold.toString());";