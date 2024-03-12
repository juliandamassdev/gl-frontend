import axiosInstance from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Token Sets Upload Files
 */
export const postTokenSetsUploadFiles = async ({ token, payload }: { token: string; payload: any }): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/token-sets/upload-files`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

const useTokenSetsUploadFiles = () => useMutation({ mutationFn: postTokenSetsUploadFiles });

/**
 * Get Token Sets Layers
 */
export const getTokenSetsLayers = async ({ token, uuid }: { token: string; uuid: string }): Promise<any> => {
  try {
    const response = await axios.get(`${backendUrl}/token-sets/layers`, {
      params: { uuid: uuid },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

const useGetTokenSetsLayers = ({ token, uuid }: { token: string; uuid: string }) =>
  useQuery<any, AxiosResponse, any>({
    queryKey: ["getTokenSetsLayers", token, uuid],
    queryFn: () => getTokenSetsLayers({ token, uuid }),
    refetchOnWindowFocus: false,
  });

const useMGetTokenSetsLayers = () => useMutation({ mutationFn: getTokenSetsLayers });

/**
 * Post Token Sets
 */
export const postTokenSets = async ({ payload }: { payload: any }): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${backendUrl}/token-sets`, payload);

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

const useMTokenSets = () => useMutation({ mutationFn: postTokenSets });

export { useTokenSetsUploadFiles, useGetTokenSetsLayers, useMGetTokenSetsLayers, useMTokenSets };
