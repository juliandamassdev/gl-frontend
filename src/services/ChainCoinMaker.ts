import { ethers } from "ethers";

import coinMakerFactoryABI from "../contract/coinMakerFactory.json";

const factoryContractAddress = "0xA737159d49F0b4Ca64A562cb92a5D0722778D78D";

// id: string,
//   name: string,
//   symbol: string,
//   initialSupplyToSet: number,
//   decimalsToSet: number,
//   isMintable: boolean,
//   isBurnable: boolean,
//   isPausable: boolean,
//   isDocumentAllowed: boolean,
//   isMaxAmountOfTokensSet: boolean,
//   isTaxable: boolean,
//   maxTokenAmount: number,
//   newDocumentUri: string,
//   address: string,
//   tax: number,

export const deployCoinMaker = async (id: string) => {
  const factoryContractABI = coinMakerFactoryABI;

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(factoryContractAddress, factoryContractABI, signer);

      const valueBigNumber = ethers.utils.parseUnits("0.4", "ether");
      const priceValue = ethers.BigNumber.from(valueBigNumber);

      const tx = await factoryContract.deployCoinMaker(
        id,
        "Lemon",
        "LMN",
        ethers.BigNumber.from(100),
        ethers.BigNumber.from(11),
        [[true, true, true, true, true, true]],
        ethers.BigNumber.from(1000),
        "facebook",
        "0xd5a4904198df8cB50CFD4f698CFD967AD8ec91f0",
        ethers.BigNumber.from(2),
      );

      await tx.wait();

      return tx.hash;
    }
  } catch (error: any) {
    console.log(error);
  }
};
