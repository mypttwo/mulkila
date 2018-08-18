let getNetworkCode = (name) => {
    let networkCode = 0;
    switch (name) {
        case "Main":
          networkCode = 1;
          break;
        case "Morden":
         networkCode = 2;
         break;
        case "Ropsten":
          networkCode = 3;
          break;
        case "Rinkeby":
          networkCode = 4;
          break;
        case "Kovan":
          networkCode = 42;
          break;
        default:
          networkCode = 0;
      }
      return networkCode;
}

export default getNetworkCode;