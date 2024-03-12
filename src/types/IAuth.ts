export interface IResPostAuthWalletLogin {
  success: boolean;
  message: string;
  data: {
    jwt: string;
  };
}

export interface IPayloadPostAuthWalletLogin {
  message: string;
  signature: string;
}
