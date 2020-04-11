import axios from "axios";
import { serverUrl } from "../constants/types";

const vote = (params) => {
  return axios.post(`${serverUrl}/vote`, params);
};

const prepareVotesForUser = async (id) => {
  return await axios
    .post(`${serverUrl}/vote/prepare-for-user`, { id })
    .then((result) => result.data);
};

const voteService = {
  vote,
  prepareVotesForUser,
};

export default voteService;
