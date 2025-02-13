import { message } from "antd";
import axios from "axios";
import { config } from "localforage";
import { toast } from "react-toastify";

const baseURL="http://localhost:4000";

const getToken = ()=>{
  const token = localStorage.getItem('token');
  if (token && token.length < 1000) { // Adjust the size limit based on your token
    return token;
  }
  localStorage.removeItem('token');
  return null;

}

export const publicRoute = axios.create({
  baseURL,
})

export const privateRoute = axios.create({
  baseURL,
  // withCredentials: true
 
})

privateRoute.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if(token){
      config.headers.Authorization = `Bearer ${token}`,
      config.headers["Content-Type"] ='application/json' ;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

privateRoute.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) =>{
    const originalRequest = error.config;

    if(error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.pathname = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
)

const apiService = {
  //Auth
  login: async (formData) => {
    try{
      const response = await publicRoute.post("/api/login", formData);
      console.log("response---",response.data);
      return response.data;
    }catch (error) {
      console.log("Error occurred in login", error.response.data);
      return {success: false, message: error.response.data.message};
    }
  },
}

export default apiService;