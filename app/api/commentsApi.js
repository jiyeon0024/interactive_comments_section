import api from "./api";

export const getComments = async () => {
  return await api.get("http://localhost:3002/comments");
};

export const postComments = async (value) => {
  return await api
    .post("http://localhost:3002/comments", value)
    .then((res) => console.log("success"));
};
