const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'sense wrong cross promote rate elite account security aware okay raise replace',
    'https://rinkeby.infura.io/v3/15cddac9c13945ddacad93d708c672b5'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth
        .Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log(accounts[0]);
    console.log('contract deployed to', result.options.address);
};
deploy();