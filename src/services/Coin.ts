import { getCookie } from "cookies-next";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const accessToken = getCookie("signed-in-jwt");

export const getCoins = async (): Promise<any> => {
  try {
    const response = await axios.get(`${backendUrl}/coins`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
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

export const postCoins = async (payload: any): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/coins`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
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

export const putCoins = async (id: string, payload: any): Promise<any> => {
  try {
    const response = await axios.put(`${backendUrl}/coins/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
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
