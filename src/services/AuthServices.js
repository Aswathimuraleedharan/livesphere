import axiosInstance from './Axios';


// Function to log in the user
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`http://localhost:8000/auth/login`, { email, password });
    // console.log(response)
    const token = response.data.access_token;
    const role = response.data.role;
    // alert(role1);
    // const role = "user"
    localStorage.setItem('token', token); // Store the JWT in localStorage
    localStorage.setItem('role', role); // Store the role in localStorage
    // return token;
    // return role;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

// Function to log out the user
export const logout = () => {
  // localStorage.removeItem('token'); // Remove the token from localStorage
  // localStorage.removeItem('role'); // Remove the user role from localStorage
  localStorage.clear();
};

// Function to get the current token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Function to get the current user's role
export const getUserRole = () => {
  return localStorage.getItem('role');
};



