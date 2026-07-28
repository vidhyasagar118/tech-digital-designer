import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  // अगर backend cookie भी use करता है
  // तो इसे true रहने दो.
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    config.headers =
      config.headers || {};

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    /*
     * FormData request में Content-Type manually
     * set नहीं करना है। Browser अपने आप multipart
     * boundary के साथ सही header लगाएगा।
     */
    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {
      if (
        typeof config.headers.setContentType ===
        "function"
      ) {
        config.headers.setContentType(
          undefined
        );
      } else {
        delete config.headers[
          "Content-Type"
        ];

        delete config.headers[
          "content-type"
        ];
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      error.response?.status === 401
    ) {
      console.warn(
        "Authentication failed:",
        error.response?.data?.message
      );
    }

    console.error("API request failed:", {
      method:
        error.config?.method,
      url:
        error.config?.url,
      status:
        error.response?.status,
      message:
        error.response?.data?.message,
      data:
        error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default API;