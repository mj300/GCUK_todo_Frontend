import axios from "axios";
import nuxtConfig from "~/nuxt.config";

const option = () => {
  return {
    baseURL: nuxtConfig.axios.baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    withCredentials: false
  };
};

const GetAllRecords = "***GET-ALL***";
const GetAllTodo = async (
  selectedPage,
  maxNumberPerItemsPage,
  searchValue = GetAllRecords,
  isComplete = GetAllRecords
) => {
  selectedPage = encodeURIComponent(selectedPage);
  maxNumberPerItemsPage = encodeURIComponent(maxNumberPerItemsPage);
  searchValue = encodeURIComponent(searchValue);
  isComplete = encodeURIComponent(isComplete);
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.get(
      `/todo/${selectedPage}/${maxNumberPerItemsPage}/${searchValue}/${isComplete}/false/id`
    );
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
const Add = async name => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.post(`/todo`, {
      name: name,
      isComplete: false
    });
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
const Toggle = async id => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.put(`/todo/toggle/${id}`);
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
const Edit = async todo => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.put(`/todo/${todo.id}`, todo);
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
const Delete = async id => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.delete(`/todo/${id}`);
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

export { GetAllTodo, Toggle, Edit, Delete, Add };
