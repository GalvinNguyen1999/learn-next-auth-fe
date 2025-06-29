import axios from "axios";

// Tạo instance axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:4000",
  timeout: 10000, // 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor để thêm token nếu có
apiClient.interceptors.request.use(
  (config) => {
    // Có thể thêm logic để lấy token từ localStorage hoặc session
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi chung
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi chung ở đây
    if (error.response) {
      // Server trả về response với status code ngoài range 2xx
      console.error("API Error:", error.response.data);

      // Có thể xử lý các status code cụ thể
      switch (error.response.status) {
        case 401:
          // Unauthorized - có thể redirect về login
          console.log("Unauthorized access");
          break;
        case 403:
          // Forbidden
          console.log("Access forbidden");
          break;
        case 404:
          // Not found
          console.log("Resource not found");
          break;
        case 500:
          // Internal server error
          console.log("Internal server error");
          break;
        default:
          console.log("Other error occurred");
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error("Network Error:", error.request);
    } else {
      // Có lỗi khi setup request
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
