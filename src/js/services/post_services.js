import axios from "axios";
import { serverUrl } from "./../constants/types";

const fetchPagination = async (params) => {
  return await axios.post(`${serverUrl}/user/register`, params);
};

export const postServices = {
  fetchPagination,
};
