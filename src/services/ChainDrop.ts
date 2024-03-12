import { ethers } from "ethers";

import factoryABI from "../contract/factory.json";
import erc1155DropABI from "../contract/erc1155Drop.json";

const factoryContractAddress = "0xC9083Af60C0EA73Cedcd8a5E46C417ba0429eCF7";

export const deployDrop = async ({ id, name, symbol, uri, maxSupply, amountMinted, price, uuid }: any) => {
  const factoryContractABI = factoryABI;

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(factoryContractAddress, factoryContractABI, signer);

      const valueBigNumber = ethers.utils.parseUnits(price, "ether");
      const priceValue = ethers.BigNumber.from(valueBigNumber);

      const tx = await factoryContract.deploy1155Drop(
        id,
        name,
        symbol,
        uri,
        [[ethers.BigNumber.from(maxSupply), ethers.BigNumber.from(amountMinted), priceValue, uuid]],
        true,
      );

      await tx.wait();

      return tx.hash;
    }
  } catch (error: any) {
    throw error;
  }
};

export const createDropToken = async ({ address, maxSupply, amountMinted, price, uuid }: any) => {
  const erc1155DropContractABI = erc1155DropABI;

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(address, erc1155DropContractABI, signer);

      const valueBigNumber = ethers.utils.parseUnits(price, "ether");
      const priceValue = ethers.BigNumber.from(valueBigNumber);

      const tx = await factoryContract.createDropToken([
        ethers.BigNumber.from(maxSupply),
        ethers.BigNumber.from(amountMinted),
        priceValue,
        uuid,
      ]);

      await tx.wait();

      return tx.hash;
    }
  } catch (error: any) {
    throw error;
  }
};
