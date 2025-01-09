import axios from 'axios';

const api = axios.create({
  baseURL: 'https://car-api-o2p5.onrender.com/api' ||'https://localhost:5173', // Your backend API URL
  withCredentials: true, // Send cookies with requests
});

// Register a new user
export const registerUser = (userData) => {
  return api.post('/users/register', userData);
};

// Login a user
export const loginUser = (credentials) => {
  return api.post('/users/login', credentials);
};

// Get cars with pagination and filtering
export const getCars = (params) => {
  return api.get('/cars', { params });
};

// Refresh access token
export const refreshAccessToken = (refreshToken) => {
  return api.post('/users/refresh-token', { refreshToken });
};

//contact form 
export const contactUs=(userData)=>{
  return api.post('/contact', userData);
}
