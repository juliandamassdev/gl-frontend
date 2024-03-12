export interface ICollection {
  _id: string;
  collectionId: ICollectionId;
  collectibleId: ICollectibleId;
  createdAt: string;
  type: string;
  updatedAt: string;
}

export interface ICollectionId {
  _id: string;
  artWork: ICollectionArtWork;
  chainName: string;
  contract: ICollectionContract;
  createdAt: string;
  createdBy: string;
  metadata: ICollectionMetadata;
  name: string;
  page: ICollectionPage;
  symbol: string;
  tokenSetId: string;
  totalSupply: number;
  updatedAt: string;
  viewAt: string;
}

export interface ICollectionArtWork {
  _id: string;
  active: boolean;
  animationFormat: string;
  animationSpeed: number;
  dimension: number;
  format: string;
  pixelArtStyle: boolean;
}

export interface ICollectionContract {
  _id: string;
  address: string;
  enforceRoyalty: boolean;
  globalLimit: number;
  owner: string;
  phases: IContractPhases[];
  revenues: IAddressPercentage[];
  royalties: IAddressPercentage[];
}

export interface IContractPhases {
  _id: string;
  allowlist: string[];
  perTransactionMaximum: number;
  perWalletMaximum: number;
  price: {
    $numberDecimal: string;
  };
  public: true;
  startSellingAt: string;
  status: string;
  supply: number;
}

export interface IAddressPercentage {
  _id: string;
  address: string;
  percentage: number;
}

export interface ICollectionMetadata {
  _id: string;
  description: string;
  name: string;
}

export interface ICollectionPage {
  _id: string;
  coverImg: string;
  description: string;
  discord: string;
  medium: string;
  profileImg: string;
  title: string;
  twitter: string;
  website: string;
}

export interface ICollectibleId {
  _id: string;
  amountMinted: number;
  createdAt: string;
  createdBy: string;
  description: string;
  dropId: string;
  imgURL: string;
  lockedContent: string;
  name: string;
  onchainId: number;
  price: string;
  properties: ICollectibleProperties[];
  supply: number;
  txHash: string;
  updatedAt: string;
  viewAt: string;
}

export interface ICollectibleProperties {
  name: string;
  value: string;
}

export interface IPresignedUrlPayload {
  fileName: string;
  fileType: string;
}
