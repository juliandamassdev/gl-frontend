import { getCookie } from "cookies-next";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const accessToken = getCookie("signed-in-jwt");

export const postTokenSets = async (token: string, payload: any): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/token-sets`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const postTokenSetsUploadFiles = async (payload: any): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/token-sets/upload-files`, payload, {
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

export const getTokenSetsLayers = async (uuid: string): Promise<any> => {
  try {
    const response = await axios.get(`${backendUrl}/token-sets/layers`, {
      params: { uuid: uuid },
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

export const getTokenSets = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(`${backendUrl}/token-sets?page=1&perPage=10`, {
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
