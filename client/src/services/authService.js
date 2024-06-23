// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';

// const authService = {
//   login: async (email, password) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
//       console.log("@service : login response", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("@service : login error", error.response?.data || error.message);
//       throw error;
//     }
//   },

//   register: async (fullname, email, password, phone, dob, bio, forgotPassQ, forgotPassA) => {
//     try {
//       const response = await axios.post(`${API_URL}/auth/register`, {
//         fullname,
//         email,
//         password,
//         phone,
//         dob,
//         bio,
//         forgotPassQ,
//         forgotPassA
//       }, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   },

//   refreshToken: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/auth/refresh`, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   },

//   setAuthHeader: (token) => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   },

//   decodeToken: (token) => {
//     return JSON.parse(atob(token.split('.')[1]));
//   }
// };

// export default authService;
