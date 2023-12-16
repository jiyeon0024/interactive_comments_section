import api from "./api";

export const getUerInfo = async () => {
  return api.get("https://jsonplaceholder.org/users");
};
