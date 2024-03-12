export interface IDeployPayload {
  collectionID: string;
  collectionName: string;
  collectionSymbol: string;
  collectionURI: string;
  phases: IDeployPayloadPhases[];
  revenues: IDeployPayloadRevenuesRoyalties[];
  royalties: IDeployPayloadRevenuesRoyalties[];
}

export interface IDeployPayloadPhases {
  id: string;
  price: number;
  supply: number;
  perWalletMaximum: number;
  perTransactionMaximum: number;
  duration: number;
  startSellingDate: number;
  merkleRoot: string;
  status: number;
}

export interface IDeployPayloadRevenuesRoyalties {
  address: string;
  percentage: number;
}
