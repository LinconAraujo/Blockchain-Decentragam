import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import Decentragram from "../abis/Decentragram.json";

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();

    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });

      try {
        const web3 = new Web3(window.ethereum);

        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    reject("Install Metamask");
  });

const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Decentragram.networks[networkId];

  if (deployedNetwork) {
    const decentragram = new web3.eth.Contract(
      Decentragram.abi,
      deployedNetwork && deployedNetwork.address
    );

    return { decentragram };
  } else {
    window.alert("Decentragram contract not deployed to detected network.");
  }
};

export { getWeb3, getContracts };
