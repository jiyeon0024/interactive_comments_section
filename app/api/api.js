import axios from "axios";

const api = () => {
  return {
    get: async (url) => {
      const res = await axios.get(url);
      return res;
    },
    post: async (url, data) => {
      const res = await axios.post(url, data);
      return res;
    },
  };
};

export default api();
