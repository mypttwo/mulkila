import getNetworkName from "./getNetworkName";

let getNetwork = () => {
    return window.web3.eth.net.getId().then((networkId) => {
        return getNetworkName(networkId);
    });
}

export default getNetwork;