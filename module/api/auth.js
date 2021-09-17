import axios from "axios";
import nuxtConfig from "~/nuxt.config";

const option = {
  baseURL: nuxtConfig.axios.baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
};

const apiCaller = axios.create(option);

const Login = async loginInfo => {
  try {
    const response = await apiCaller.post("/user/login", loginInfo);
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
const Register = async registerInfo => {
  try {
    const response = await apiCaller.post("/user/register", registerInfo);
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export { Login, Register };
