export interface IDropCollectiblesPayload {
  description?: string;
  imgURL?: string;
  lockedContent?: string;
  name?: string;
  price?: string;
  viewAt?: string;
  properties?: IDropProperties[];
  supply?: number;
  txHash?: string;
}

export interface IDropProperties {
  name?: string;
  value?: string;
}
