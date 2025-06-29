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

// User API functions
export const userApi = {
  // Tìm user theo email
  findByEmail: async (email: string): Promise<ApiResponse<User | null>> => {
    try {
      const response = await apiClient.get("/user/find-by-email", {
        params: {
          email,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  // Tạo user mới
  create: async (userData: {
    email: string;
    name?: string;
    avatar?: string;
    password: string;
  }): Promise<ApiResponse<User>> => {
    const response = await apiClient.post("/user", userData);
    return response.data;
  },

  // Lấy thông tin user theo ID
  getById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  },

  // Cập nhật thông tin user
  update: async (
    id: string,
    userData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const response = await apiClient.put(`/user/${id}`, userData);
    return response.data;
  },

  // Xóa user
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  },
};

// Auth API functions
export const authApi = {
  // Đăng nhập
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ token: string; user: User }>> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  // Đăng ký
  register: async (userData: {
    email: string;
    password: string;
    name?: string;
  }): Promise<ApiResponse<{ token: string; user: User }>> => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  // Đăng xuất
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },
};

// Export default để có thể import tất cả
export default {
  user: userApi,
  auth: authApi,
};
