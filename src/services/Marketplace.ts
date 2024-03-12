import { responseGetMarketplaces, responseGetMarketplacesListing } from "@/const/mock";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getMarketplaces = async (): Promise<any> => {
  try {
    // TODO: Dev mock data
    const response = await axios.get(`${backendUrl}/marketplaces`);
    // const response = await responseGetMarketplaces;

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

export const getMarketplacesListing = async ({ id }: { id: string }): Promise<any> => {
  try {
    // TODO: Dev mock data
    const response = await axios.get(`${backendUrl}/marketplaces/${id}/listing`);
    // const response = await responseGetMarketplacesListing;

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
