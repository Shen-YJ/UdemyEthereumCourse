const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile.js');

let accounts;
let inbox;
const initialMessage = 'hi,how are you???';

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [initialMessage] })
        .send({ from: accounts[0], gas: '1000000' })

        inbox.setProvider(provider);
});

describe('Inbox', () => {
    // test if the contract is deployed.
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
        console.log(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    })
    
    it('can change the message', async () => {
        const receipt = await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
        console.log(receipt);
    })
})