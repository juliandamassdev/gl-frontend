import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postServerImagesUpload = async (payload: any): Promise<any> => {
  try {
    const response = await axios.post(`${backendUrl}/server-images/upload`, payload);

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
