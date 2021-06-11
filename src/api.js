import axios from "axios";
import usersListMockResponse from "./usersListMockResponse.json";

export const getParticipants = () => {
  const url =
    "https://wgpyg5d6p0.execute-api.us-east-1.amazonaws.com/prod/scan";
  return axios.get(url);
};

export const slackApi = (method) => {
  if (method === "users.list") {
    return Promise.resolve({ data: usersListMockResponse });
  }
};
