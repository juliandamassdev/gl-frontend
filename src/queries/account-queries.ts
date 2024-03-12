import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getUsersMyProfile = async ({ token }: { token: string }) => {
  try {
    const response = await axios.get(`${backendUrl}/users/my-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useGetUsersMyProfile = ({ token }: { token: string }) =>
  useQuery({
    queryKey: ["getUsersMyProfile", token],
    queryFn: () => getUsersMyProfile({ token }),
    retry: 3,
  });

export { useGetUsersMyProfile };
