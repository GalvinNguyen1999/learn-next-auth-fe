import apiClient from "./axios";

// Định nghĩa types cho API responses
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const userApi = {
  create: async (userData: {
    email: string;
    name?: string;
    avatar?: string;
  }): Promise<ApiResponse<User>> => {
    const response = await apiClient.post("/user/register", userData);
    return response.data;
  },
};

export default {
  user: userApi,
};
