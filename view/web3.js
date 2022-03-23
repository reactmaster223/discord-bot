const Web3 = require("web3");
const web3 = new Web3(window.ethereum)
  // If privacy is turned off in Metamask
        window.addEventListener('load', () => {
                  if (typeof web3 !== 'undefined') {
                      web3 = new Web3(web3.currentProvider);
                      console.log("Success")
                  } else {
                      console.log('No web3? You should consider trying MetaMask!');
                      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
                  }
              });

        // If privacy is turned on in Metamask
        window.addEventListener('load', async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    // Request account access if needed
                    await ethereum.enable();
                    // Acccounts now exposed
                    console.log("Success")
                } catch (error) {
                    // User denied account access...
                    console.log(error)
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
            }
        });

        // Set a default account
        web3.eth.defaultAccount = web3.eth.accounts[0];