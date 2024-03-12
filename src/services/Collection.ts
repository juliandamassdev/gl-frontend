import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const accessToken = getCookie("signed-in-jwt");

export const getCollections = async ({ token, windowOption }: { token: string; windowOption?: any }): Promise<any> => {
  try {
    const response = await axios.get(`${backendUrl}/collections?page=1&perPage=6`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    // Check if error has a response property and if it's an AxiosResponse
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        // deleteCookie("signed-in-address", windowOption);
        // deleteCookie("signed-in-type", windowOption);
        // deleteCookie("signed-in-jwt", windowOption);
        // window.location.replace("/auth");
      }

      // Throw the error's response
      throw error.response;
    } else {
      // Throw a custom error message
      throw new Error("An unknown error occurred.");
    }
  }
};

export const postCollections = async (payload: any): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/collections`, payload, {
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

export const postCollectionUploadImage = async (payload: any): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/collections/upload-image`, payload, {
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
