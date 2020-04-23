import axios from "axios";
import { serverUrl } from "./../constants/types";
export default axios.create({
  baseURL: serverUrl,
});


