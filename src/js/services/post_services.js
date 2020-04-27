import axios from "axios";
import { serverUrl } from "../constants/types";

const pagination = async (params) => {
  return axios.post(`${serverUrl}/post/pagination`, params);
};

const postServices = {
  pagination 
};

export default postServices;