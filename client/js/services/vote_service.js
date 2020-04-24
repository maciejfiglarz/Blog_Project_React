import API from "../helper/api";

const vote = (params) => {
  return API.post(`/vote`, params);
};

const prepareVotesForUser = async (user) => {
  console.log('user',user);
  return API.post(
    `/vote/prepare-for-user`,
    { user },
    { headers: { Authorization: "Bearer " + user.token } }
  );
};
const prepareVotesForUserTest = async (user) => {
  
  return API.post(
    `/vote/prepare-for-user`,
    { user },
    { headers: { Authorization: "Bearer " + user.token } }
  );
};


const voteService = {
  vote,
  prepareVotesForUser,
  prepareVotesForUserTest,
};

export default voteService;
