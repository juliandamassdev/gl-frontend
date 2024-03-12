import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/api";
import axios from "axios";

/**
 * getCollections
 * @returns getCollections
 */
const getCollections = async () => {
  try {
    const response = await axiosInstance.get(`/collections`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useGetCollections = () =>
  useQuery<any, any, any>({
    queryKey: ["getCollections"],
    queryFn: () => getCollections(),
    retry: 3,
  });

/**
 * getCollections
 * @returns getCollections
 */
const getTokenSets = async () => {
  try {
    const response = await axiosInstance.get(`/token-sets?page=1&perPage=10`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useGetTokenSets = () =>
  useQuery<any, any, any>({
    queryKey: ["getTokenSets"],
    queryFn: () => getTokenSets(),
    retry: 3,
  });

/**
 * getCollections
 * @returns getCollections
 */
const getTokenSetsLayers = async ({ uuid }: { uuid: string }) => {
  try {
    const response = await axiosInstance.get(`/token-sets/layers`, {
      params: { uuid: uuid },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useGetTokenSetsLayers = ({ uuid }: { uuid: string }) =>
  useQuery<any, any, any>({
    queryKey: ["getTokenSetsLayers", uuid],
    queryFn: () => getTokenSetsLayers({ uuid }),
    retry: 3,
  });

/**
 * postCollections
 */
export const postCollections = async ({ payload }: { payload: any }): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/collections`, payload);

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

const useMCollections = () => useMutation({ mutationFn: postCollections });

/**
 * postCollectionUploadImage
 */
export const postCollectionUploadImage = async ({ payload }: { payload: any }): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/collections/upload-image`, payload);

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

const useMCollectionUploadImage = () => useMutation({ mutationFn: postCollectionUploadImage });

export { useGetCollections, useGetTokenSets, useGetTokenSetsLayers, useMCollections, useMCollectionUploadImage };
