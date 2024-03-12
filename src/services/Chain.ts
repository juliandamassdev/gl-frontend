import { ethers } from "ethers";

import { IDeployPayload } from "@/types/IChain";

import factoryABI from "../contract/factory.json";

const factoryContractAddress = "0xC9083Af60C0EA73Cedcd8a5E46C417ba0429eCF7";

export const deploy = async ({
  collectionID,
  collectionName,
  collectionSymbol,
  collectionURI,
  phases: phasesData,
  revenues: revenuesData,
  royalties: royaltiesData,
}: IDeployPayload) => {
  const factoryContractABI = factoryABI;
  const maxSupply = 1000;

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(factoryContractAddress, factoryContractABI, signer);

      // Get base fee
      const baseFeePerNFT = await factoryContract.baseFeePerNFT();
      const revenues = revenuesData.map(item => [item.address, item.percentage]);
      const royalties = royaltiesData.map(item => [item.address, item.percentage]);
      const phases = phasesData.map(item => [
        item.id,
        item.price,
        item.supply,
        0,
        item.perWalletMaximum,
        item.perTransactionMaximum,
        item.duration,
        item.startSellingDate,
        item.merkleRoot,
        item.status,
      ]);

      const tx = await factoryContract.deploy721Drop(
        collectionID,
        collectionName,
        collectionSymbol,
        collectionURI,
        maxSupply,
        phases,
        revenues,
        royalties,
        true,
        { value: ethers.BigNumber.from(maxSupply).mul(baseFeePerNFT) },
      );

      return tx.hash;
    }
  } catch (error: any) {
    throw error;
  }
};
