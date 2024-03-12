import { ethers } from "ethers";

import weth9 from "../contract/weth9.json";

const contractAddress = "0xeaA98223d691879060C7daA08055cF1a3549C00c";

export const wrap = async ({ price }: { price: string }) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(contractAddress, weth9, signer);

      const valueBigNumber = ethers.utils.parseUnits(price, "ether");
      const priceValue = ethers.BigNumber.from(valueBigNumber);

      const tx = await factoryContract.deposit({ value: priceValue });

      await tx.wait();

      return tx.hash;
    }
  } catch (error: any) {
    throw error;
  }
};

export const unWrap = async ({ price }: { price: string }) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(contractAddress, weth9, signer);

      const valueBigNumber = ethers.utils.parseUnits(price, "ether");
      const priceValue = ethers.BigNumber.from(valueBigNumber);

      const tx = await factoryContract.withdraw(priceValue);

      await tx.wait();

      console.log(tx);

      return tx.hash;
    }
  } catch (error: any) {
    console.log(error);

    throw error;
  }
};
