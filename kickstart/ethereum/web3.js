import Web3 from 'web3';

// ethereum.enable();

// const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server *OR* the user is not running metamask.
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/15cddac9c13945ddacad93d708c672b5'
    );
    
    web3 = new Web3(provider);
}

export default web3;