import axios, { AxiosResponse } from "axios";
import { IPayloadPostAuthWalletLogin, IResPostAuthWalletLogin } from "@/types/IAuth";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postAuthWalletLogin = async (payload: IPayloadPostAuthWalletLogin): Promise<IResPostAuthWalletLogin> => {
  try {
    const response = await axios.post(`${backendUrl}/auth/wallet/login`, payload);

    return response.data;
  } catch (error) {
    // Check if error has a response property and if it's an AxiosResponse
    if (axios.isAxiosError(error) && error.response) {
      // Throw the error's response
      throw error.response;
    } else {
      // Throw a custom error message
      throw new Error("An unknown error occurred.");
    }
  }
};
