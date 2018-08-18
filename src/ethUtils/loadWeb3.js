import Web3 from 'web3';

let loadWeb3 = (handleWeb3NotAvailable, handleWeb3Available) => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
        if (window.web3.currentProvider.isMetaMask === true) {
            //console.log('Coinbase Doesnt work WHY?', window.web3.eth.coinbase);            
            window.web3.eth.getAccounts((error, accounts) => {
                if(error){
                    console.log('Error', error);
                }
                if (accounts.length === 0) {
                    handleWeb3NotAvailable();
                } else {
                    handleWeb3Available(accounts);
                }
            });
        } else {
            console.log('Metamask not available. Another web3 provider available');
            handleWeb3NotAvailable();
        }
    } else {
        console.log('No web 3 provider available');
        handleWeb3NotAvailable();
    }
}


export default loadWeb3;