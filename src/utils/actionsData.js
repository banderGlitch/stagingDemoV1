const actionsData = [
    {
      id: 'sendCrypto',
      name: 'Send Crypto',
      description: 'amount of  to walletaddress...',
      parameters: [
        { name: 'amount', type: 'number', placeholder: '0.5' },
        { name: 'crypto', type: 'text', placeholder: 'ETH' },
        { name: 'walletAddress', type: 'text', placeholder: '0xABC123...' }
    ]
     
    },
    {
        id: 'vrf',
        name: 'Vrf',
        description: 'Generate a random number',
        parameters: []
      },
    {
        id: 'donate',
        name: 'Donate',
        description: 'Donate Crypto from my to walletaddress... to a',
        parameters: [
            { name: 'amount', type: 'number', placeholder: '0.1' },
            { name: 'crypto', type: 'text', placeholder: 'BTC' },
            { name: 'walletAddress', type: 'text', placeholder: 'Charity wallet address' }
        ]
      },
    // Add more actions here
  ];
  export default actionsData;
