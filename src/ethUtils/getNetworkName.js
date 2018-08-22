let getNetworkName = (networkId) => {
    let networkName = "Unknown";
    switch (networkId) {
        case 1:
          networkName = "Main";
          break;
        case 2:
         networkName = "Morden";
         break;
        case 3:
          networkName = "Ropsten";
          break;
        case 4:
          networkName = "Rinkeby";
          break;
        case 42:
          networkName = "Kovan";
          break;
        default:
          networkName = "Unknown";
      }
      return networkName;          

}

export default getNetworkName;