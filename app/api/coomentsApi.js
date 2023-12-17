import api from "./api";

export const getComments = async () => {
  return api.get("data.json");
};
