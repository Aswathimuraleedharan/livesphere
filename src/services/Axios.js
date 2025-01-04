import axios from 'axios';
const API_URL = 'http://localhost:8000'; // Use the correct server URL
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Optional: Set a timeout
});
// Add request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization header with token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // The server responded with a status code out of the range of 2xx
      console.error('Error Response:', error.response);
      if (error.response.status === 401) {
        // Unauthorized - maybe redirect to login page
        localStorage.clear(); // Clear token and role
        window.location.href = '/login'; // Redirect to login page
      } else {
        // Other errors
        alert('An error occurred: ' + error.response.data.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
      alert('Network error, please try again later.');
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error); // Reject the error
  }
);
export default axiosInstance;
